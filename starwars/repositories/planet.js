const MongoRepository = require('./mongo');
const Planet = require('../models/planet');
const SWApiService = require('../services/swapi');

class PlanetRepository{

    static findOne(filter, callback){
        MongoRepository.connect();
        return Planet.findOne(filter, '-__v', (err, planet) => {
            if(planet){
                SWApiService.getApperancesByName(planet.name).then(value => {
                    planet._doc.appearances = value;
                    return callback(err, planet)
                }, err => {
                    return callback(err, planet);
                });
            }else{
                return callback(err, planet);
            }
        });
    }

    static insert(obj, callback){
        MongoRepository.connect();
        let planet = new Planet();
        planet.name = obj.name;
        planet.climate = obj.climate;
        planet.terrain = obj.terrain;
        planet.save((err, planet) => {
            if (err) {
                let errors = Object.keys(err.errors).map(value => {
                    return err.errors[value].message;
                });
                return callback(errors);
            }
            return callback(undefined, planet);
        });
    }

    static remove(id, callback){
        MongoRepository.connect();
        return Planet.findOneAndRemove({_id: id}, callback);
    }
}

module.exports = PlanetRepository;
