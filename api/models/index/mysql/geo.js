const geo = require('mysql2');
const {promisify} = require('util');

const pool = geo.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  database: "geo",
  password: "adMin235"
});

const promiseQuery = promisify(pool.query).bind(pool);
const promisePoolEnd = promisify(pool.end).bind(pool);

module.exports = class Geo{

	async getCountry(){
		return await promiseQuery("SELECT * FROM country");
	}


	async getArea(country){
		return await promiseQuery("SELECT * FROM area WHERE country_code = '" + country + "'");
	}

	async getDistrict(area_rajon){
		return await promiseQuery("SELECT * FROM district WHERE area_id = " + area_rajon);
	}

	async getCitiesFromDistrict(rajon_city){
		return await promiseQuery("SELECT * FROM city WHERE district_id = " + rajon_city);
	}

	async getCitiesFromArea(area){
		return await promiseQuery("SELECT * FROM city WHERE area_id = " + area);
	}

};