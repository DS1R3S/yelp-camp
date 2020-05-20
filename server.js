const express = require("express");

// const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Serve up static assets


// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://user1:password1@ds125871.mlab.com:25871/heroku_0xn0jnk7",
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
//   }
// );

app.get('/', (req,res)=> {
    res.render('index')
})

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
