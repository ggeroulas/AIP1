const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./api/routes/routes');
const secureRoutes = require('./api/routes/secure-routes');
const app = express();
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  
  } else {
   
    console.log(`Worker ${process.pid} started`);
  
    app.get('/cluster', (req, res) => {
      let worker = cluster.worker.id;
      res.send(`Running on worker with id ==> ${worker}`);
    });

// Mongoose instance connection url 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cardshark');

require('./api/auth/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//registers and utilises the routes
app.use('/', routes); 
app.use('/user', passport.authenticate('jwt', { session : false}), secureRoutes );

//Handles all errors, if status not specified by catch default is 500.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
})

// If bad requests for server come in they are redirected to a page not found.
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found'});
});

// Opens port
server = app.listen(PORT, () => {
    console.log('Running on http://localhost:' + PORT + '/');
});

}