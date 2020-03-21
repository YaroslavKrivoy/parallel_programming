const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";


module.exports = class Geo{

    async getCountry(){
        return new Promise((resolve, reject) =>{
            MongoClient.connect(url, { useUnifiedTopology: true },(err, client) => {
                if(err) reject(err);
                resolve(client.db("geo").collection("country").find().toArray());
            });
        });
    }

    async getArea(country){
        return new Promise((resolve, reject) =>{
            MongoClient.connect(url, { useUnifiedTopology: true },(err, client) => {
                if(err) reject(err);
                resolve(client.db("geo").collection("area").find({country_code: country.toString()}).toArray());
            });
        });
    }

    async getDistrict(area_rajon){
        return new Promise((resolve, reject) =>{
            MongoClient.connect(url, { useUnifiedTopology: true },(err, client) => {
                if(err) reject(err);
                resolve(client.db("geo").collection("district").find({area_id: parseInt(area_rajon)}).toArray());
            });
        });
    }

    async getCitiesFromDistrict(rajon_city){
        return new Promise((resolve, reject) =>{
            MongoClient.connect(url, { useUnifiedTopology: true },(err, client) => {
                if(err) reject(err);
                resolve(client.db("geo").collection("city").find({district_id: parseInt(rajon_city)}).toArray());
            });
        });
    }

    async getCitiesFromArea(area){
        return new Promise((resolve, reject) =>{
            MongoClient.connect(url, { useUnifiedTopology: true },(err, client) => {
                if(err) reject(err);
                resolve(client.db("geo").collection("city").find({area_id: parseInt(area)}).toArray());
            });
        });
    }

};