const express = require( 'express' );
const app = express();
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});
var socketio = require('socket.io');

nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html',function (err, output) {
    /*console.log(output);*/
});

app.use(express.static('public'));
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates


var server = app.listen(3005);

var io = socketio.listen(server);

app.use('/', routes(io));
