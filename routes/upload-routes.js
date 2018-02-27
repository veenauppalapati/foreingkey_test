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
};