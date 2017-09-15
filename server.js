// Dependencies
// =============================================================
var express       = require("express");
var bodyParser    = require("body-parser");
var path          = require("path");
const Reservation = require('./Reservation')

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

var pages = ["/", "/reserve", "/tables", "/404"];

// var pages = [
//   {
//     name: "" //index.html
//   },
//   {
//
//   }
// ]

// // Web server routes
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
//
// app.get("/reserve", function(req, res) {
//   res.sendFile(path.join(__dirname, "reserve.html"));
// });
//
// app.get("/tables", function(req, res) {
//   res.sendFile(path.join(__dirname, "tables.html"));
// });

app.get("/:page?", function (req, res) {
  // var page = req.params.page;
  res.end(req.params.page);
  // var requested = pages.indexOf(page);
  //
  // if (requested != -1) {
  //   res.sendFile(path.join(__dirname, pages[requested]));
  // } else {
  //   res.sendFile(path.join(__dirname, "test404.html"));
  // }
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
// for (var i = 0; i < 5; i++) {
//   tablelist.push(new Table(i))
// }

var waitlist = [];

function addReservation(reserv) {
  if (tablelist.length > 4) {
    waitlist.push(reserv);
  } else {
    tablelist.push(reserv);
  }
}


// api GET table list
app.get("/api/tables", function(request, response) {
  response.json(tablelist);
});

// api POST new reservation
app.post("/api/new", function(req, res) {
  console.log(req.body);
  addReservation(req.body);
  res.send(req.body);
});

// api GET waitlist
app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
