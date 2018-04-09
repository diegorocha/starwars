const request = require('supertest');
const app = require('../app');
const mock = require('./mock');
const PlanetRepository = require('../repositories/planet');

describe('GET /api/planets', () => {
    let url = '/api/planets';

    test('It should redirect', async () => {
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(301);
        expect(response.headers['location']).toEqual('page/1');
    });

});

describe('GET /api/planets/page/:page', () => {
    let url = '/api/planets/page/';

    test('It should not have a page -1', async () => {
        let finalUrl = url + '-1';
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(404);
    });

    test('It should not have a page 0', async () => {
        let finalUrl = url + '0';
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(404);
    });

    test('It should have a page 1', async () => {
        let finalUrl = url + '1';
        PlanetRepository.findAll = mock.PlanetRepositoryFindAll;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toEqual(['next', 'count', 'results']);
        expect(response.body.count).toBe(response.body.results.length);
    });

    test('It should not have a page 10', async () => {
        let finalUrl = url + '10';
        PlanetRepository.findAll = mock.PlanetRepositoryFindAll;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(404);
    });

    test('It should return 500 when error', async () => {
        let finalUrl = url + '1';
        PlanetRepository.findAll = mock.PlanetRepositoryError;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(500);
    });
});

describe('POST /api/planets', async () => {
    let url = '/api/planets';

    test('It should return 400 with errors', async () => {
        PlanetRepository.insert = mock.PlanetRepositoryInsert;
        const response = await request(app).post(url);
        expect(Object.keys(response.body)).toEqual(['errors']);
        expect(response.statusCode).toBe(400);
    });

    test('It should return 201 and _id', async () => {
        let payload = {
            name: 'foo',
            climate: 'bar',
            terrain: 'foobar'
        };
        PlanetRepository.insert = mock.PlanetRepositoryInsert;
        const response = await request(app).post(url).send(payload);
        expect(Object.keys(response.body)).toEqual(['_id']);
        expect(response.statusCode).toBe(201);
    });
});

describe('GET /api/planets/:id', () => {
    let url = '/api/planets/';

    test('It should return a planet', async () => {
        let finalUrl = url + '2';
        PlanetRepository.findOne = mock.PlanetRepositoryFindOne;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mock.planet);
    });

    test('It should not return a planet', async () => {
        let finalUrl = url + '1';
        PlanetRepository.findOne = mock.PlanetRepositoryFindOne;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(404);
    });

    test('It should return 500 when error', async () => {
        let finalUrl = url + '1';
        PlanetRepository.findOne = mock.PlanetRepositoryError;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(500);
    });

});

describe('GET /api/planets/:name', () => {
    let url = '/api/planets/name/';

    test('It should return a planet', async () => {
        let finalUrl = url + 'Tatooine';
        PlanetRepository.findOne = mock.PlanetRepositoryFindOne;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mock.planet);
    });

    test('It should not return a planet', async () => {
        let finalUrl = url + 'foo';
        PlanetRepository.findOne = mock.PlanetRepositoryFindOne;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(404);
    });

    test('It should return 500 when error', async () => {
        let finalUrl = url + 'foo';
        PlanetRepository.findOne = mock.PlanetRepositoryError;
        const response = await request(app).get(finalUrl);
        expect(response.statusCode).toBe(500);
    });

});

describe('DELETE /api/planets/:id', () => {
    let url = '/api/planets/';

    test('It should return 204', async () => {
        let finalUrl = url + '2';
        PlanetRepository.remove = mock.PlanetRepositoryRemove;
        const response = await request(app).delete(finalUrl);
        expect(response.statusCode).toBe(204);
    });

    test('It should return 404', async () => {
        let finalUrl = url + '1';
        PlanetRepository.remove = mock.PlanetRepositoryRemove;
        const response = await request(app).delete(finalUrl);
        expect(response.statusCode).toBe(404);
    });

    test('It should return 500 when error', async () => {
        let finalUrl = url + '1';
        PlanetRepository.remove = mock.PlanetRepositoryError;
        const response = await request(app).delete(finalUrl);
        expect(response.statusCode).toBe(500);
    });

});
