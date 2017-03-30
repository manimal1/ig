var fs = require('fs');
var path = require('path');
var express = require('express');
var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware');

var app = module.exports = express();

app.use(
    sassMiddleware({
        src: __dirname + '/styles/sass',
        dest: __dirname,
        debug: true,
        force: true,
    })
);

app.use(express.static(path.join(__dirname, 'styles')));

app.set('views', './views');
app.set('view engine', 'pug');

// viewed at http://localhost:80
app.get('/', function(req, res) {
    res.render( 'index' );
    req.params = { user: localstorage.getItem( 'user' ) }
    console.log(req.params);
});

app.get('/settings', function(req, res) {
    res.render('settings');
});

app.get('/groups', function(req, res) {
    res.render('groups');
});

app.get('/messages', function(req, res) {
    res.render('messages');
});

app.listen(80);
