const request = require('supertest');
const app = require('../app');
const MongoRepository = require('../repositories/mongo');
const mock = require('./mock');

describe('health', () => {

    test('GET /ping', async () => {
        const response = await request(app).get('/ping');
        expect(response.statusCode).toBe(200);
    });

    test('GET /healthcheck OK', async () => {
        MongoRepository.getConnection = mock.getConnectionSuccess;
        const response = await request(app).get('/healthcheck');
        expect(response.body).toEqual({node:'OK', mongo:'OK'});
        expect(response.statusCode).toBe(200);
    });

    test('GET /healthcheck Not OK', async () => {
        MongoRepository.getConnection = mock.getConnectionFail;
        const response = await request(app).get('/healthcheck');
        expect(response.body).toEqual({node:'OK', mongo:'Not OK'});
        expect(response.statusCode).toBe(200);
    });
});
