// index.js for travel-in-ukraine-app
// load the things we need

require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg')
var myParser = require("body-parser");
const pool = new Pool({connectionString: connectionString});
const bcrypt = require('bcrypt');
const saltRounds = 10;


app
  .use(express.static(path.join(__dirname, 'public')))
  .use(myParser.urlencoded({extended : true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // index2 page
  .get('/', (req, res) => res.render('pages/index2'))
  .get('/getcontactform', (req, res) => res.render('pages/contactform'))
  .get('/getloginform', (req, res) => res.render('pages/loginform'))
  .get('/getsignupform', (req, res) => res.render('pages/signupform'))
  .post('/login', logIn)
  .post('/signup', signUp)
  .post('/contactinfo', saveContactInfo)
  .get('/placesofinterestlist', getPlacesOfInterest)
	
  // placesofinterest page
  //.get('/placesofinterest', (req, res) => res.render('pages/placesofinterest'))
  .get('/placesofinterest', getPlacesOfInterest)
  .get('/placeofinterestdetails', getPlaceOfInterestDetails)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  
  function logIn(req, res) {
	console.log("Log In Info:");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.email);
	console.log(obj.password);
  }
  
  function signUp(req, res) {
	console.log("Sign Up Info:");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.name);
	var name = obj.name;
	console.log(obj.email);
	console.log(obj.password);
	var password = obj.password;
	bcrypt.hash(password, saltRounds, function(err, hash) {
  pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [obj.name, obj.email, hash], function(err, result) {
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result of signup:");
	console.log(result);
	console.log(`User added with ID: ${result.insertId}`);
	
	res.sendStatus(200);
	
	//callback(null, result.rows);
    });
});

  }
  
  function saveContactInfo(req, res, next){
	  console.log("Inserting info into DB");
	var obj = JSON.parse(req.body.jsonstring2);
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
  pool.query('INSERT INTO contacts (contactname, contactemail, message) VALUES ($1, $2, $3)', [obj.name, obj.email, obj.message], function(err, result) {
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result);
	console.log(`User added with ID: ${result.insertId}`);
	//res.status(200).json(placesOfInterest);
	var name = obj.name;
	
	res.sendStatus(200);
	
	//callback(null, result.rows);
    });
  }
  
  function getPlacesOfInterest(req, res){
	  console.log("Getting places of interest from DB");
	
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
  pool.query('SELECT * FROM placesofinterest', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result.rows);
	const placesOfInterest = result.rows;
	console.log("placesOfInterest variable:");
	console.log(placesOfInterest);
	//res.status(200).json(placesOfInterest);
	
	res.render('pages/placesofinterestlist', {
        placesOfInterest: placesOfInterest
    });
	
	//callback(null, result.rows);
    });
  }
	
	
	
	function getPlaceOfInterestDetails(req, res){
	  console.log("Getting place of interest from DB");
	
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
  pool.query('SELECT * FROM placesofinterest WHERE id=' + req.query.id + '', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(req.query.id);
	console.log(result.rows);
	const placeOfInterest = result.rows;
	console.log("placeOfInterest variable:");
	console.log(placeOfInterest);
	console.log(placeOfInterest[0].placeofinterestname);
	
	//res.status(200).json(placesOfInterest);
	
	res.render('pages/placeofinterest', {
        placeOfInterest: placeOfInterest[0]
    });
	
	//callback(null, result.rows);
    });
	  	
  }
  
  
  function getPlacesOfInterestFromDb(callback) {
	
  }
  
  // cd cs313-node/travel_in_ukraine_app