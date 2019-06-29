// index.js for travel-in-ukraine-app
// load the things we need

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString});

// block of code to test to query data from the person table
var sql = "SELECT * FROM placesofinterest";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);


});

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // index2 page
  .get('/', (req, res) => pool.query('SELECT * FROM placesofinterest', function(err, result) {
	  console.log(result);
	  //var placesOfInterest = result.rows;
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result);
    })
	//res.render('pages/index2')
	)
	
  // placesofinterest page
  .get('/placesofinterest', (req, res) => res.render('pages/placesofinterest'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
