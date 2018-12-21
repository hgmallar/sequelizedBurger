// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {

  // GET route for getting all of the burgers
  app.get("/", function (req, res) {
    //get all of the burgers in sorted alphabetically by name
    db.Burger.findAll({
      order: [
        ['burger_name', 'ASC'],
      ],
      include: [db.Eater]
    }).then(function (dbBurger) {
      res.render("index", { burgers: dbBurger });
    });
  });

  // POST route for creating a burger
  app.post("/api/burgers", function (req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function (dbBurger) {
      res.json({ id: res.id });
    });
  });

  // POST route for creating an eater
  app.post("/api/eaters", function (req, res) {
    db.Eater.create({
      name: req.body.name
    }).then(function (dbEater) {
      res.json(dbEater);
    });
  });

  // PUT route for updating a burgers devoured state and eater_id
  app.put("/api/burgers/:id", function (req, res) {
    db.Burger.update({
      devoured: req.body.devoured,
      EaterId: req.body.eater_id
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
          res.redirect("back");
        }
      });
  });

};