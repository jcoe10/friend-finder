// DEPENDENCIES 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// EXPRESS APP 
const app = express();

// LOCAL PORT
const PORT = 7777;

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// SETTING THE EXPRESS APP TO STATIC
app.use(express.static('app'));

// REQUIRING THE ROUTE FILES
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// SETTING THE PORT TO BE DYNAMIC OR THE LOCAL PORT NUMBER
app.listen(process.env.PORT || 7777);
console.log('listening on:', PORT);