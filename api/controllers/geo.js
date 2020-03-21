const Geo = require('../models/index/mysql/geo.js');

const geo = new Geo();

exports.getCountries = async (req, res) =>{
	res.render('index.hbs',{
		countries : await geo.getCountry().catch(error => console.log(error))
	});
};

exports.getAreas = async (req, res) =>{
	let areas = await geo.getArea(req.query.country).catch(error => console.log(error));
	res.send(areas);
};

exports.getDistricts = async (req, res) =>{
	let districts = await geo.getDistrict(req.query.area_rajon).catch(error => console.log(error));
	res.send(districts);
};

exports.getCitiesFromDistrict = async (req, res) =>{
	let cities = await geo.getCitiesFromDistrict(req.query.rajon_city).catch(error => console.log(error));
	res.send(cities);
};

exports.getCitiesFromArea = async (req, res) =>{
	let cities = await geo.getCitiesFromArea(req.query.area).catch(error => console.log(error));
	res.send(cities);
};