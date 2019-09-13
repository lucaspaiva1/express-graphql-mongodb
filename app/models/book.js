const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema({
    name: String,
    pages: Number,
    authorID: Schema.Types.ObjectId
});

module.exports = mongoose.model("Book", book);