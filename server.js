const express = require("express");
const bodyParser = require('body-parser')
const Campground = require('./models/campground')
const Comment = require('./models/comment')
const Handlebars = require('handlebars')
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parsing for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

app.engine("handlebars", exphbs({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));

app.set("view engine", "handlebars");
// Serve up static assets
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'))



// Add routes, both API and view
// var routes = require('./routes/api')

// app.use(routes);app

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/campgrounds",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


// INDEX
app.get('/', (req, res) => {
  res.render('index')
})

// GET  all campgrounds
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err)
    } else {

      res.render('index', { campgrounds: allCampgrounds })
    }
  })
})
// POST new campground
app.post('/campgrounds', (req, res) => {
  const name = req.body.name
  const image = req.body.image
  // const description = req.body.description
  const newCampgroundObj = { name: name, image: image }

  Campground.create(newCampgroundObj, (err, newObject) => {
    if (err) {
      console.log(err)
    } else {

      res.redirect('/campgrounds')
    }
  })
})

// GET form page to add new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('new')
})

app.get('/campgrounds/:id', (req, res)=> {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err)
    } else {
      res.render('show', {campgrounds: foundCampground})
    }
  })
})



//
app.get('/campgrounds/:id', (req, res) => {
  res.send('')
})





// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
