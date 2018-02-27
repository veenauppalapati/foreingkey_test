// Dependencies
// =============================================================

// Requiring our User model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

   
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  var filename = req.files.sampleFile.name
 console.log(__dirname);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+`_${filename}_image.jpg` , function(err) {
    if (err)
      return res.status(500).send(err.message);
 
    res.send('File uploaded!');
  });
});

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
      return db.Profession.create({
          category: req.body['professionData[category]']
      });
  }).then(function (professionData) {
      tmpJson.professionData = professionData;
      res.status(200).json({
          status: "success",
          reason: tmpJson
      });
  });
});
};