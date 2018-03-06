const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const comicSchema = new Schema({
    name: String,
    writer: String,
    artist: String,
    publisher: String,
    volume: Number,
    cover: String
})

const Comic = mongoose.model('Comic', comicSchema);

module.exports = {Comic: Comic};