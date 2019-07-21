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
var session = require('express-session');

// set up sessions
app.use(session({
  secret: 'my express secret',
  saveUninitialized: true,
  resave: false
}));

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(myParser.urlencoded({extended : true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // index2 page
  .get('/', (req, res) => res.render('pages/index2'))
  .get('/getcontactform', (req, res) => res.render('pages/contactform'))
  .get('/getloginform', getLogInForm)
  .get('/getloginoutmenu', getLogInOutMenu)
  .get('/getsignupform', (req, res) => res.render('pages/signupform'))
  .post('/login', logIn)
  .get('/logout', logOut)
  .post('/signup', signUp)
  .get('/manageaccount', manageAccount)
  .post('/updateaccountinfo', updateAccountInfo)
  .get('/getmanageaccountform', getManageAccountForm)
  .post('/contactinfo', saveContactInfo)
  .get('/placesofinterestlist', getPlacesOfInterest)
	
  // placesofinterest page
  //.get('/placesofinterest', (req, res) => res.render('pages/placesofinterest'))
  .get('/placesofinterest', getPlacesOfInterest)
  .get('/placeofinterestdetails', getPlaceOfInterestDetails)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  
  
  function getLogInOutMenu(req, res) {
	  console.log("getLogInOutMenu is working !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	  console.log(req.session);
	  console.log(req.session.user);
	  if(req.session.user){
		  var loggedinas = "You are logged in as " + req.session.user;
		 res.render('partials/loggedinnav', {
        loggedinas: loggedinas
    }); 
	  } else {
		 res.render('partials/loggedoutnav');
	  }
  }
  
  
  function getLogInForm(req, res) {
	  var loggedinas = "";
	var name = "";
	res.render('pages/loginform', {
        name: name
    });
  }
  
  
  
  function logIn(req, res) {
	console.log("Log In Info:");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.email);
	console.log(obj.password);
	pool.query('SELECT * FROM users WHERE email = $1', [obj.email], function(err, result) {
	  
	  console.log("Result from DB");
	console.log(result);
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result of selecting for login:");
	console.log(result.rows[0].password);
	
	// Load hash from your password DB.
	var password = obj.password;
	console.log("Password for bcrypt.compare");
	console.log(password);
	var hashForCompare = result.rows[0].password;
	console.log("Hash for bcrypt.compare");
	console.log(hashForCompare);
	var loggedin = false;
	if(bcrypt.compare(password, hashForCompare)){
		console.log("Result of comparing the passwords:");
	console.log(res);
	loggedin = true;
	req.session.user = result.rows[0].username;
	req.session.email = result.rows[0].email;
	console.log("Session info:");
	console.log(req.session);
	console.log("Session user info:");
	console.log(req.session.user);
		res.render("pages/index2");
		}




});
}


function logOut(req, res) {
	req.session.destroy(function(err) {
  res.render("pages/index2");
})
	
}

function manageAccount(req, res){
	var name = req.session.user;
	var email = req.session.email;
	var updateaccountresult = "";
	res.render("pages/manageaccount", {
        name: name,
		email: email,
		updateaccountresult: updateaccountresult
    });
}

function getManageAccountForm(req, res){
	var name = req.session.user;
	var email = req.session.email;
	res.render("pages/manage_account_page", {
        name: name,
		email: email
    });
}

function updateAccountInfo(req, res){
	console.log("Update Info: %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.name);
	console.log(obj.email);
	pool.query('UPDATE users SET username = $1, email = $2 WHERE username = $3', [obj.name, obj.email, req.session.user], function(err, result) {
	console.log("Result from DB");
	console.log(result);
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  
	  
});

pool.query('SELECT * FROM users', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  

var updateaccountresult = "Your account information has been successfully updated";
var name = result.rows[0].username;
var email = result.rows[0].email;
if(result.rowCount) {
req.session.user = name;
req.session.email = email;
}

res.render("pages/manageaccount", {
        name: name,
		email: email,
		updateaccountresult: updateaccountresult
    });
});
}
  
  function signUp(req, res) {
	console.log("Sign Up Info:");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.name);
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
	console.log(result.rowCount);
	console.log(`User added with ID: ${result.insertId}`);
	
	//res.sendStatus(200);
	
	var name = "";
	if(result.rowCount){
		name = "You have successfully signed up as " + obj.name + ". Now you can log in.";
	} else {
		name = "Sorry. Signing up has failed. Please, try again.";
		res.render('pages/signupform', {
        name: name
    });
	}
	
	res.render('pages/loginform', {
        name: name
    });
	
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