$$$$$$$\  $$$$$$$$\  $$$$$$\  $$$$$$$\        $$\      $$\ $$$$$$$$\ 
$$  __$$\ $$  _____|$$  __$$\ $$  __$$\       $$$\    $$$ |$$  _____|
$$ |  $$ |$$ |      $$ /  $$ |$$ |  $$ |      $$$$\  $$$$ |$$ |      
$$$$$$$  |$$$$$\    $$$$$$$$ |$$ |  $$ |      $$\$$\$$ $$ |$$$$$\    
$$  __$$< $$  __|   $$  __$$ |$$ |  $$ |      $$ \$$$  $$ |$$  __|   
$$ |  $$ |$$ |      $$ |  $$ |$$ |  $$ |      $$ |\$  /$$ |$$ |      
$$ |  $$ |$$$$$$$$\ $$ |  $$ |$$$$$$$  |      $$ | \_/ $$ |$$$$$$$$\ 
\__|  \__|\________|\__|  \__|\_______/       \__|     \__|\________|
                                                                 
Support Documentation for CardShark© 

Developers:
	
	De Shun Zhong
	George Geroulas

-----------------------------------------------

1. CODING AND NAMING STANDARDS

	* Commenting will be used consistently throughout the application. Commenting is required as a 	minimum for the 
	following code items:

		- Components
		- Functions
		- Constructors and Fields
		- Returns
		- Loops and Decisions

	* Readability is critical and as such indentation and spacing will be used consistently across all 	JavaScript and CSS
	files. For example:

		class Game extends Component {

			constructor() {
				super();
				this.state = {score: 0};
			}

		}

	* React components should be written in JSX format.

	* Modularity throughout the application will ensure code is as reusable and will ensure that the 	application is efficient as possible. This means separating components and CSS files such  that 	multiple instances of components can be rendered throughout the application. There should be no 	more than one component per React file.

	* Code must never be hardcoded and variables must always be passed up or down using the 	component's state or by utilising props. Apart from being an ethical consideration, hardcoding 	components is a security issue - irrespective of how sensitive the data is - and will be exempt from 
	the application.

	* Naming Conventions must be meaningful and relevant. DOM component prop names should be 	avoided when naming to minimise confusion (e.g. style= className=). Conventions will adhere to the 	following standards throughout the 		
	application:

		- Variables:  myName: "George" , var myName = "George";
		- Components: import Game from './Game';
		- Functions: opponentHand() { ...
		- Props: <Cards blankCard = "empty" />

	* Version control is to be maintained throughout development and maintenance. Functionality that is 
	that is still in development must branch off from master to ensure changes do not affect the working 
	build of the application. These branches can then be merged later once finalised. Branches  must be 
	appropriately named.

	* Configuration is to be stored in environmental variables. This is to ensure that between stages of 
	deployment they are not accidentally added into the code repository accidentally.

	* Within the code repository, the application should make no association whether services are  run 
	locally or via third party through our backend service AWS.

	* Back end services that will be used during deployment should also be used during the development 
	stages. This will ensure that the system is as compatible as possible for deployment and will help to 
	iron out any small problems with compatibility.

	* The game is based on an online session and as such the only data that should be stored is the login 
	and score for the users. Any other data should be considered stateless and should have no association 
	external from that session.

	* The output of the application should be routed to the console for monitoring of the behaviour of the 
	application. Logs should also be stored in a file database so that any errors or inconsistencies can be 
	tracked.

	* Commit messages must be meaningful and specific to the iteration being pushed to the code 
	repository.

	* Mixins should not be within the application as they will cause unneeded dependencies, clashes and 
	make the project unnecessarily complex.

	* JSX attributes must always utilise double quotations "", meaning all other JSX items must use single 
	quotations ''.

-----------------------------------------------

2. GAME

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

3. APPLICATION STACK & DEPENDENCIES
	
	* Front-End: React, JS, CSS
		
		Proxy: "http://localhost:3000"
		Libraries:
			- react
    			- react-dom
			- react-scripts 
			- axios (Used to make HTTP requests to backend)
   			- bootstrap (Main styling library)
	
	* Back-End: JS, MongoDB
		
		Proxy: "http://localhost:5000"
		Libraries: 
			- express (server framework)
		    	- bcrypt (password hashing function)
    			- cors (middleware for Connect/Express)
    			- jsonwebtoken (creates web tokens)
    			- mongoose (object modeling tool for MongoDB)
    			- passport (authentication middleware)
    			- passport-jwt
    			- passport-local
		
	* Running on AWS at: http://52.14.196.83

------------------------------------------------
	






