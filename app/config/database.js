const mongoose = require("mongoose");

const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

module.exports = mongoose.connect(`mongodb://${host}:${port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// test connection
// mongoose.connection.once('open', () => {
//     console.log('conneted to database');
// });