// Dependencies
// =============================================================
var express     = require("express");
var bodyParser  = require("body-parser");
var path        = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// =============================================================

// Web server routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Logic
// =============================================================
var Table = function(tableNumber) {
  return {
    tableNumber,
    seats:5
  }
}

//limited to 5
var tablelist = [];
for (var i = 0; i < 5; i++) {
  tablelist.push(new Table(i))
}

var waitlist = [];

var Reservation = function (name, phone, email) {
  return {
    name,
    phone,
    email
  }
}

// api GET table list
app.get("/api/tables", function(req, res) {
  res.json(tablelist);
});

// api POST new reservation
app.post("/api/new", function(req, res) {

});

// api GET waitlist
app.get("/api/waitlist", function(req, res) {

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
