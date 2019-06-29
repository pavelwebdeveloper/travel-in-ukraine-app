// index.js for travel-in-ukraine-app
// load the things we need

require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString});


app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // index2 page
  .get('/', (req, res) => res.render('pages/index2'))
  .get('/placesofinterestlist', getPlacesOfInterest)
	
  // placesofinterest page
  .get('/placesofinterest', (req, res) => res.render('pages/placesofinterest'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  
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
	  
	  /*
	  getPlacesOfInterestFromDb(function(error, result){
		
		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			res.status(500).json({success: false, data: error});
		} else {
			const placesOfInterest = result;
			//res.status(200).json(placesOfInterest);
			res.status(200).json(placesOfInterest);
			//res.render('pages/index2', {
        //placesOfInterest: placesOfInterest
    //});
		}
	});
	*/ 
	  	
  }
  
  
  function getPlacesOfInterestFromDb(callback) {
	
  }