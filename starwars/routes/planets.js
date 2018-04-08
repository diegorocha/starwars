const express = require('express');
const router = express.Router();
const PlanetRepository = require('../repositories/planet');
const url = require('url');

router.get('/', function(req, res, next) {
    res.redirect(301, 'page/1');
});

/* List all */
router.get('/page/:page?', function(req, res, next) {
    let page = parseInt(req.params.page) || 1;
    PlanetRepository.findAll(page, (err, planets) => {
        if(err){
            return next(err)
        }
        if(planets.length > 0){
            let nextPage = page + 1;
            let nextPageUrl = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: `${req.baseUrl}/${nextPage}`
            });
            let response = {
                next: nextPageUrl,
                count: planets.length,
                results: planets
            };
            return res.send(response);
        }else{
            return res.sendStatus(404);
        }

    });
});

/* Add */
router.post('/', function(req, res, next) {
    PlanetRepository.insert(req.body, (errors, planet) => {
       if(errors){
           return res.status(400).send({errors});
       }
       return res.status(201).send({_id: planet._id});
    });
});

/* Search by name*/
router.get('/name/:name', function(req, res, next) {
    let name = req.params.name;
    PlanetRepository.findOne({name}, (err, planet) => {
        if(err){
            return next(err);
        }
        if(planet){
            return res.send(planet);
        }
        return res.sendStatus(404);
    });
});

/* Search by id */
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    PlanetRepository.findOne({_id: id}, (err, planet) => {
        if(err){
            return next(err);
        }
        if(planet){
           return res.send(planet);
        }
        return res.sendStatus(404);
    });
});

/* Remove */
router.delete('/:id', function(req, res, next) {
    let id = req.params.id;
    PlanetRepository.remove(id, (err, writeOpResult) => {
        if(err){
            return next(err);
        }
        if(writeOpResult){
            return res.sendStatus(204)
        }
        return res.sendStatus(404);
    });
});

module.exports = router;
