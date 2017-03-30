const fs = require('fs');
const path = require('path');
const express = require('express');
const app = module.exports = express();

console.log( process.argv );

app.use( '/public', express.static( process.cwd() + '/public' ) );

app.set('views', './views');

app.set('view engine', 'pug');
//
app.get( '/', function( req, res, next ) {
    res.render( 'index' );
});

app.listen(9090);
