const express = require( 'express' );
const app = express();

app.use('/', function (req, res, next) {
	res.send('Haz llegado a tu destino viajero');
	next();    
})

app.use('/special',function (req, res, next){
	res.send('Has llegado a un destino especial');
	next();
})













app.listen(3005)