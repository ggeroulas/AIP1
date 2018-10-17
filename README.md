# CardShark
                                                                 
Support Documentation for CardShark© 

CardShark is an online game similar to BlackJack, with similar rules. This appliation was built upon create-react-app.

Developers:
	
	De Shun Zhong
	George Geroulas

-----------------------------------------------

## How To Get Started

	To run this application locally you can first of all clone this repository.

	This application runs both the Front-End and the Back-End (Database) separately, 
	therefore, being by switching the directory to the Database and installing the 
	relevant node modules before starting the Database by the following

	1. cd Database/
	2. npm install
	3. npm start

	This should start the server on port 5000 and accessible at http://localhost:5000.

	Next, we must do the same for the Front-End:

	1. cd Front-End/
	2. npm install
	3. npm start
	
	This should start the Front-End on port 3000 and accessible at http://localhost:3000, 
	from your preferred browser.


-----------------------------------------------

## Game

                    The object of CardShark is to achieve a total of 21 points or a points
                    sum greater than the dealer. You start with 2 cards, the sum of which 
                    determines your amount of points. All card numbers reflect a relevant amount of 
                    points. The exceptions are King, Queen and Jack which are all worth 10. As well 
                    as Ace which can be either 1 or 11.
             
                    You may click HIT until you have a desired amount of cards, or until
                    you reach a sum greater than 21. If this occurs, your hand of cards is 
                    bust and the dealer automatically wins the round.
             
                    If you do not wish to draw more cards you may STAND your hand which will 
                    determine a winner for the round.
              
                    Once a winner is determined, you may click NEXT GAME which will begin 
                    the next round. Winning gains the player 100 pts, losing removes 100pts.
		    
------------------------------------------------

## Application Stack & Dependencies
	
	Front-End: React, JS, CSS
		
		Proxy: "http://localhost:3000"
		Libraries:
			* react
			* react-dom
			* react-scripts 
			* axios (Used to make HTTP requests to backend)
			* bootstrap (Main styling library)
	
	Back-End: JS, MongoDB
		
		Proxy: "http://localhost:5000"
		Libraries: 
			* express (server framework)
			* bcrypt (password hashing function)
			* jsonwebtoken (creates web tokens)
			* mongoose (object modeling tool for MongoDB)
			* passport (authentication middleware)
			* passport-jwt 
			* passport-local
		Developer Dependencies:
			* Babel-cli (transpiler enabling the use of new versions of ECMAScript)
			* babel-preset-es2015
			* nodemon (enable automatic server restart on changes)

------------------------------------------------
	
## Component Structure

	* Index
	* App
		* Header
		* Game
			* Table
			* Navigation
			* High Score
			* GameRules
			* Cards
			* Player
		* Footer

------------------------------------------------

## Components

### Index
Root component of the application. Renders main component App and implements core libraries.

### App
Main component of the application, renders core components Header, Game and Footer.

### Header
Header for the application, visible across all screens. Contains title and spinning shark logo.

### Footer
Footer runs across bottom of all screens.

### Game
Main container for game components. This component contains a number of functions to allow navigation between menus and game components. All subcomponents are rendered and then are either show or hidden by changing props.

#### Table
Component contains main methods for the card game itself, including evaluating points, winning as well as score. The deck of cards is also managed through this component and the associated DeckFunctions.js file. Table renders the score, the dealer, player as well as input options for handling user actions in the game. 

#### Navigation
The navigation bar runs below the header of every screen, includes options to login/register, logout, high scores, game rules or enter the actual game. Renders all buttons, each of which can be toggled depending on the screen currently being displayed.

#### High Score
Retrieves top 10 highest scoring players from the database and renders it in a table.

#### Game Rules
Renders the rules of CardShark.

#### Player
Renders the containers for the players cards, also renders cards component.

#### Cards
Does not render actual card containers but returns the value and suit for each card, or otherwise the back of the card if it is flipped.

------------------------------------------------

## Styling

Bootstrap is used as the main CSS library throughout the application. It is imported in the root component meaning it can be used throughout the whole application. Some of the basics used in the application will be touched on, for more information and examples refer to the [documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/). Containers and the grid system are used to place elements on the screen, this also scales to smaller devices. Where needed padding or margin adjustments are made using p- or m- to space elements. Bootstrap colours are used inline throughout the application, such as bg-info (Background colour set to blue). Where bootstrap styles need to be modified or overridden, components may include a relevant CSS file with styling attributes that better suit the application. For example adjustments to colour, text size, min-width etc. 

------------------------------------------------

## Server API

The front-end framework makes HTTP request to the back-end API which routes to relevant RESTful methods. These methods retrieve and store data as well as handling authentication. The routes are divided into secure routes which cannot be accessed once authenticated and non-secure routes which can be called from anywhere in the application. The web methods will be explained briefly.

### Routes

/test
* Tests the connection between the front-end and back-end

/register
* Routes to auth.js, registers the user into the database or returns 400 error if register was unsuccesful

/login
* Validates login request data against database, if succesful validation will return 200 'OK' response. If unsuccesful due to incorrect or incomplete data, will return 401 error with relevant message

/highScore
* Queries the database to return the top 10 highest scoring players

### Secure Routes

/userScore
* Returns the user's score from the database

/scoreUpdate
* Updates the user's score in the database

/
* Retrieves the user id and their username

------------------------------------------------

## Code, Naming and Standards

	* Commenting will be used consistently throughout the application. Commenting is required as a 	minimum for the 
	following code items:

		- Components
		- Functions
		- Constructors and Fields
		- Returns
		- Loops and Decisions

	* Readability is critical and as such indentation and spacing will be used consistently across all JavaScript and CSS
	files. For example:

		class Game extends Component {

			constructor() {
				super();
				this.state = {score: 0};
			}

		}

	* React components should be written in JSX format.

	* Modularity throughout the application will ensure code is as reusable and will ensure that the application is
	efficient as possible. This means separating components and CSS files such that multiple instances of components can
	be rendered throughout the application. There should be no more than one component per React file.

	* Code must never be hardcoded and variables must always be passed up or down using the component's state or by
	utilising props. Apart from being an ethical consideration, hardcoding components is a security issue - irrespective
	of how sensitive the data is - and will be exempt from the application.

	* Naming Conventions must be meaningful and relevant. DOM component prop names should be avoided when naming to
	minimise confusion (e.g. style= className=). Conventions will adhere to the following standards throughout the
	application:

		- Variables:  myName: "George" , var myName = "George";
		- Components: import Game from './Game';
		- Functions: opponentHand() { ...
		- Props: <Cards blankCard = "empty" />

	* Version control is to be maintained throughout development and maintenance. Functionality that is that is still in
	development must branch off from master to ensure changes do not affect the working build of the application. These
	branches can then be merged later once finalised. Branches must be appropriately named.

	* Configuration is to be stored in environmental variables. This is to ensure that between stages of deployment they
	are not accidentally added into the code repository accidentally.

	* Within the code repository, the application should make no association whether services are run locally or via third
	party through our backend service AWS.

	* Back end services that will be used during deployment should also be used during the development stages. This will
	ensure that the system is as compatible as possible for deployment and will help to iron out any small problems with
	compatibility.

	* The game is based on an online session and as such the only data that should be stored is the login and score for
	the users. Any other data should be considered stateless and should have no association external from that session.

	* The output of the application should be routed to the console for monitoring of the behaviour of the application.
	Logs should also be stored in a file database so that any errors or inconsistencies can be tracked.

	* Commit messages must be meaningful and specific to the iteration being pushed to the code repository.

	* Mixins should not be within the application as they will cause unneeded dependencies, clashes and make the project
	unnecessarily complex.

	* JSX attributes must always utilise double quotations, meaning all other JSX items must use single quotations.





