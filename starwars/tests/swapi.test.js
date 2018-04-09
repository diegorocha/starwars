const SWApiService = require('../services/swapi');
const axios = require('axios');
const mock = require('./mock');

describe('SWApiService', () => {

    test('getApperancesByName success', async () => {
        axios.get = mock.SWApiGetSuccess;
        SWApiService.getApperancesByName('Foo').then(result => {
            expect(result).toBe(5);
        });
    });

    test('getApperancesByName not exists', async () => {
        axios.get = mock.SWApiGetNotFound;
        SWApiService.getApperancesByName('Foo').then(result => {
            expect(result).toBe(undefined);
        });
    });

    test('getApperancesByName error', async () => {
        axios.get = mock.SWApiGetError;
        SWApiService.getApperancesByName('Foo').then(result => {
            expect(result).toBe(undefined);
        });
    });
});
