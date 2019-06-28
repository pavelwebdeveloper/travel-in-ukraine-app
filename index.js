// index.js for travel-in-ukraine-app
// load the things we need

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // index2 page
  .get('/', (req, res) => res.render('pages/index2'))
  // placesofinterest page
  .get('/placesofinterest', (req, res) => res.render('pages/placesofinterest'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
