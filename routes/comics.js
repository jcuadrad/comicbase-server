var express = require('express');
var router = express.Router();

// Model Import
const Comic = require('../models/Comic').Comic;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.post('/', (req, res, next) => {
  const newComic = new Comic({
    name: req.body.name,
    writer: req.body.writer,
    artist: req.body.artist,
    publisher: req.body.publisher,
    volume: req.body.volume,
    cover: req.body.cover,
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
