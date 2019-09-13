require('dotenv').config()

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/index')
const database = require('./config/database')

const app = express();

app.use('/graphql', graphqlHTTP({
    schema
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 