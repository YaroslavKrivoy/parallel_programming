const unirest = require('unirest');
const geo_url = 'https://htmlweb.ru/geo/api.php';
const geo_api = 'e3bef10978427676b66cc2c838562f5c';

let deleteAttrResponse = (response) =>{
		delete response.body.limit;
		delete response.body.balans;
};

module.exports = class Geo{

	async getCountry(){
		let opt = {
			location : '',
			json : true,
			api_key : geo_api
		};
		return new Promise( (resolve, reject) => {
			unirest.get(geo_url)
			.query(opt)
			.end( (response, error) => {
				if(error) reject(error);
				deleteAttrResponse(response);
      			resolve(response.body);
  			});
		});		
	}

	async getArea(country){
		let opt = {
			country : country,
			json : true,
			api_key : geo_api
		};
		return new Promise( (resolve, reject) => {
			unirest.get(geo_url)
				.query(opt)
				.end( (response, error) => {
					if(error) reject(error);
					deleteAttrResponse(response);
					resolve(response.body);
				});
		});

	}

	async getDistrict(area_rajon){
		let opt = {
			area_rajon : area_rajon,
			json : true,
			api_key : geo_api
		};
		return new Promise( (resolve, reject) => {
			unirest.get(geo_url)
				.query(opt)
				.end( (response, error) => {
					if(error) reject(error);
					deleteAttrResponse(response);
					resolve(response.body);
				});
		});

	}

	async getCitiesFromDistrict(rajon_city){
		let opt = {
			rajon_city : rajon_city,
			json : true,
			api_key : geo_api
		};
		return new Promise( (resolve, reject) => {
			unirest.get(geo_url)
				.query(opt)
				.end( (response, error) => {
					if(error) reject(error);
					deleteAttrResponse(response);
					resolve(response.body);
				});
		});
	}

	async getCitiesFromArea(area){
		let opt = {
			area : area,
			json : true,
			api_key : geo_api
		};
		return new Promise( (resolve, reject) => {
			unirest.get(geo_url)
				.query(opt)
				.end( (response, error) => {
					if(error) reject(error);
					deleteAttrResponse(response);
					resolve(response.body);
				});
		});
	}

};