// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {

  // GET route for getting all of the todos
  app.get("/", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function (dbBurger) {
      // We have access to the todos as an argument inside of the callback function
      res.render("index", { burgers: dbBurger });
    });
  });

  app.post("/api/burgers", function (req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function (dbBurger) {
      res.json({ id: res.id });
    });
  });

  app.put("/api/burgers/:id", function (req, res) {
    db.Burger.update({
      devoured: true
    },
      {
        where: {
          id: req.params.id
        }
      })
      .then(function (dbBurger) {
        if (dbBurger.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      });
  });

};