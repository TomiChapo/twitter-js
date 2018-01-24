module.exports = function (io){

const express = require('express');
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});
/*router.use('/', function (req, res, next) {
	//res.send('Haz llegado a tu destino viajero');
	res.render( 'index', {title: title , people: people} );    
	next();
})*/

/*router.use('/special',function (req, res, next){
	res.send('Has llegado a un destino especial');
	next();
})*/

router.get('/', function (req, res, next) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
  next();
});

router.get('/users/:name', function(req, res, next) {
  var name = req.params.name;
  var list = tweetBank.find( { name: name } );
  res.render( 'index', { tweets: list } );
  next();
});

router.get('/tweets/:id', function(req, res, next) {
  var id = Number(req.params.id);
  var list = tweetBank.find( { id: id } );
  res.render( 'index', { tweets: list } );
  next();
});

router.get('/tweets', function (req, res, next) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
  next();
});

router.get('/form', function(req, res, next) {
	res.render('index', {showForm: true})
  next();
});

router.post('/tweets', urlencodedParser, function(req, res) {
  
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('newTweet', { name: name, tweets: text });
  res.redirect('/');
});

return router;
}

