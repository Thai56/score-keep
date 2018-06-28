# score-keep
* A pleasant score keeping application written in node.js, express.js and mysql2.
* There are already 26 contestants configured as test data. If you want to start fresh than there is an option to delete all in the endpoints section below!

# Installation and Setup
* You will need a two the two keys that were given to you so you can run the server. 
* Place the correct keys where labeled <FIRST_KEY_HERE> <SECOND_KEY_HERE>. 
* Leave out the brackets.

* 1.) npm i
* 2.) node server/index.js <FIRST_KEY_HERE> <SECOND_KEY_HERE>


# Endpoints
* GET - get all contestants - localhost:8880/contestants/
* GET - get top contestants - localhost:8880/contestants/top
* POST - add a new contestant - localhost:8880/contestants/:name/:score
* DELETE - delete a contestant - localhost:8880/contestants/:name
* DELETE - delete all contestants - localhost:8880/contestants/

# Testing
* Run test by running npm run test from root directory but make sure to have the server running with keys since it will need those keys to momentarily start the server to test on.

