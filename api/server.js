var express = require('express');
var unirest = require('unirest');
var path = require('path');

var geoController = require('./controllers/geo.js');

var app = express();

app.set("view engine", "hbs");

app.use('/public/css',express.static(path.join(__dirname, 'public/css')));
app.use('/public/js',express.static(path.join(__dirname, 'public/js')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.get('/', geoController.getCountries);

app.get('/geo/area', geoController.getAreas);
app.get('/geo/district', geoController.getDistricts);
app.get('/geo/district/city', geoController.getCitiesFromDistrict);
app.get('/geo/area/city', geoController.getAreas);

app.get('/weather/:city,:code_country', function(req,res){
	unirest.get('http://api.openweathermap.org/data/2.5/weather')
	.query({
		'appid': '990038a1aad0e05577137bbb327f5e13',
      	'q': req.params['city'] + ',' + req.params['code_country'],
        'units': 'metric'
	})
	.end(function (result) {
      var data = JSON.parse(JSON.stringify(result.body));
      res.render('weather.hbs',{
      	city : data['name'],
      	min_temp : data['main']['temp_min'],
		max_temp : data['main']['temp_max'],
      	wind_speed : data['wind']['speed'],
      	icon : 'http://openweathermap.org/img/w/' + data['weather'][0]['icon'] + '.png',
		lon: data['coord']['lon'],
		lat: data['coord']['lat'],
      	show_weather : true
      });
  });
});


app.listen(3000, function(){
	console.log('API server start');
});