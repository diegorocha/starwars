const MongoRepository = require('../repositories/mongo');
const PlanetRepository = require('../repositories/planet');
const Planet = require('../models/planet');
const mock = require('./mock');

describe('Planet Repository', () => {

    beforeEach(() => {
        MongoRepository.connect = jest.fn();
    });

    test('It should insert and return planet', async () => {
        let planet = new Planet(mock.planet);
        planet.save = mock.PlanetSaveSuccess;
        PlanetRepository.insert(planet, (err, planet) => {
            expect(err).toBe(undefined);
            expect(planet).toBe(planet);
        });
    });

    test('It should not insert and return errors', async () => {
        let planet = new Planet(mock.planet);
        planet.save = mock.PlanetSaveFail;
        PlanetRepository.insert(planet, (err, planet) => {
            expect(err).toBe(['foo is required', 'bar is required']);
            expect(planet).toBe(undefined);
        });
    });

    test('It should find one and return planet', async () => {
        let filter = {_id: 2};
        Planet.findOne = mock.PlanetFindOne;
        PlanetRepository.findOne(filter, (err, planet) => {
            expect(err).toBe(undefined);
            expect(planet).toEqual(planet);
        });
    });

    test('It should not find one and return error', async () => {
        let filter = {_id: 1};
        Planet.findOne = mock.PlanetFindOne;
        PlanetRepository.findOne(filter, (err, planet) => {
            expect(err).toEqual({});
            expect(planet).toBe(undefined);
        });
    });

    test('It should find one and remove', async () => {
        let id = 2;
        Planet.findOneAndRemove = mock.PlanetFindOneAndRemove;
        PlanetRepository.remove(id, (err, writeOpResult) => {
            expect(err).toEqual(undefined);
            expect(writeOpResult).toEqual(true);
        });
    });

    test('It should not find one and not remove', async () => {
        let id = 1;
        Planet.findOneAndRemove = mock.PlanetFindOneAndRemove;
        PlanetRepository.remove(id, (err, writeOpResult) => {
            expect(err).toEqual(undefined);
            expect(writeOpResult).toEqual(false);
        });
    });
});
