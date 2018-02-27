// Dependencies
// =============================================================

// Requiring our User model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/allmembers", function(req, res) {
      db.User.findAll({
        include: 
          {
            model: db.Profession            
          }
        })  
      .then(function(dbmembers) {
        res.json(dbmembers);
      });
    });


    // POST route for saving a User
  app.post("/api/members", function(req, res) {
    // console.log(req.body);
    let tmpJson = {};
    db.User.create({
      first_name: req.body['userData[first_name]'],
      last_name: req.body['userData[last_name]'],
      email: req.body['userData[email]'],
      password: req.body['userData[password]'],
      gender: req.body['userData[gender]'],
      pet: req.body['userData[pet]'],

    }).then(function (dbUser) {
      tmpJson.dbUser = dbUser;
      db.Profession.create({
          category: req.body['professionData[category]'], 
          owner: dbUser.id
      });
  }).then(function (professionData) {
      tmpJson.professionData = professionData;

      res.status(200).json({
          status: "success",
          reason: tmpJson
      });
  }).then(function(tmpJson){
    res.json(tmpJson);
  });
});

// GET ROUTE for specific category
// =============================================================

app.get("/api/authors/:category?", function(req, res) {
  db.User.findOne({
    where: {
      category: req.params.category
    },
    include: [db.Profession]
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});
// =============================================================

//UPDATE ROUTE
// =============================================================

//DELETE ROUTE
// =============================================================
app.delete("/api/user/:id", function(req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    alert('User has been deleted successfully');
    res.json(dbUser);
  });
});

// =============================================================
};// module closing brace