var express = require('express');
var router = express.Router();

// Model Import
const Comic = require('../models/Comic').Comic;

/* GET home page. */
router.get('/', function(req, res, next) {
  Comic.find({}, function(err, comics) {

    res.status(200).json(comics);  
  });
});

router.post('/', (req, res, next) => {
  String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  const newComic = new Comic({
    name: req.body.name.capitalize(true),
    writer: req.body.writer.capitalize(true),
    artist: req.body.artist.capitalize(true),
    publisher: req.body.publisher.capitalize(true),
    volume: req.body.volume,
    cover: req.body.cover
  });

  newComic.save(error => {
    if (error) {
      res.status(500).json({status: 'Something got fucked up'});
    } else {
      res.status(200).json({status: 'Saved!'})
    }
  })
})

module.exports = router;
