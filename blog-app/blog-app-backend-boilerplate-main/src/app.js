const express = require('express');
const app = express();

const blogRoute = require('./routes/blog');

app.use(express.json());
//setting up routes
app.use('/', blogRoute);

module.exports = app;
