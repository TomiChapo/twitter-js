const express = require('express');
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
const tweetBank = require('../tweetBank');

/*router.use('/', function (req, res, next) {
	//res.send('Haz llegado a tu destino viajero');
	res.render( 'index', {title: title , people: people} );    
	next();
})*/

router.use('/special',function (req, res, next){
	res.send('Has llegado a un destino especial');
	next();
})

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});


module.exports = router;
