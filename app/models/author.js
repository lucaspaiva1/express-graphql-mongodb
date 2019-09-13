const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const author = new Schema({
    name: String
});

module.exports = mongoose.model("Author", author);