const Planet = require('../models/planet');

describe('Model planet', () => {

    test('Empty validation', async () => {
        let planet = new Planet();
        planet.validate(err => {
           expect(Object.keys(err.errors))
               .toEqual(expect.arrayContaining([
                   'name',
                   'terrain',
                   'climate']));
        });
    });

    test('Name missing', async () => {
        let planet = new Planet({'climate': 'Arid', 'terrain': 'Desert'});
        planet.validate(err => {
            expect(Object.keys(err.errors)).toEqual(['name']);
        });
    });

    test('Terrain missing', async () => {
        let planet = new Planet({'name': 'Tatooine', 'climate': 'Arid'});
        planet.validate(err => {
            expect(Object.keys(err.errors)).toEqual(['terrain']);
        });
    });

    test('Climate missing', async () => {
        let planet = new Planet({'name': 'Tatooine', 'terrain': 'Desert'});
        planet.validate(err => {
            expect(Object.keys(err.errors)).toEqual(['climate']);
        });
    });

});
