const successData = {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "name": "Tatooine",
            "rotation_period": "23",
            "orbital_period": "304",
            "diameter": "10465",
            "climate": "arid",
            "gravity": "1 standard",
            "terrain": "desert",
            "surface_water": "1",
            "population": "200000",
            "residents": [
                "https://swapi.co/api/people/1/",
                "https://swapi.co/api/people/2/",
                "https://swapi.co/api/people/4/",
                "https://swapi.co/api/people/6/",
                "https://swapi.co/api/people/7/",
                "https://swapi.co/api/people/8/",
                "https://swapi.co/api/people/9/",
                "https://swapi.co/api/people/11/",
                "https://swapi.co/api/people/43/",
                "https://swapi.co/api/people/62/"
            ],
            "films": [
                "https://swapi.co/api/films/5/",
                "https://swapi.co/api/films/4/",
                "https://swapi.co/api/films/6/",
                "https://swapi.co/api/films/3/",
                "https://swapi.co/api/films/1/"
            ],
            "created": "2014-12-09T13:50:49.641000Z",
            "edited": "2014-12-21T20:48:04.175778Z",
            "url": "https://swapi.co/api/planets/1/"
        }
    ]
};

const notFoundData = {
    "count": 0,
    "next": null,
    "previous": null,
    "results": []
};

const planet = {
    "name": "Tatooine",
    "climate": "arid",
    "terrain": "desert"
};

class MockConnection {
    constructor(){
        this._readyState = 1;
    }
    close(){

    };
}

module.exports = {
    planet,
    pageSize: 3,
    SWApiGetSuccess: jest.fn(() => {
        return Promise.resolve({
            data: successData
        });
    }),
    SWApiGetNotFound: jest.fn(() => {
        return Promise.resolve({
            data: notFoundData
        });
    }),
    SWApiGetError: jest.fn(() => {
        return Promise.reject({
            data: {}
        });
    }),
    getConnectionSuccess: jest.fn(() => {
        return Promise.resolve(new MockConnection())
    }),
    getConnectionFail: jest.fn(() => {
       return Promise.reject({});
    }),
    PlanetSaveSuccess: jest.fn(callback => {
        callback(undefined, this);
    }),
    PlanetSaveFail: jest.fn(callback => {
        let errorData = {
            errors: {
                foo: {
                    message: 'foo is required'
                },
                bar: {
                    message: 'bar is required'
                }
            }
        };
        callback(errorData, undefined);
    }),
    PlanetFindOne: jest.fn((filter, selection, callback) => {
        let {_id} = filter;
        if(_id % 2 === 0){
            callback(undefined, planet);
        }else{
            callback({}, undefined);
        }
    }),
    PlanetFindOneAndRemove: jest.fn((filter, callback) => {
        let {_id} = filter;
        callback(undefined, _id % 2 === 0);
    }),
    PlanetRepositoryInsert: jest.fn((obj, callback) => {
       if(obj.hasOwnProperty('name')){
           callback(undefined, {_id: 42});
       }else{
           callback(['errors']);
       }
    }),
    PlanetRepositoryFindAll: jest.fn((page, callback) => {
        let pageSize = 5;
        if(page < 10){
            callback(undefined, Array(pageSize).fill(planet));
        }else{
            callback(undefined, []);
        }
    }),
    PlanetRepositoryFindOne: jest.fn((filter, callback) => {
        if(filter.hasOwnProperty('_id')){
            if(filter._id % 2 === 0){
                callback(undefined, planet);
            }else{
                callback(undefined, undefined);
            }
        }
        if(filter.hasOwnProperty('name')){
            if(filter.name === "Tatooine"){
                callback(undefined, planet);
            }else{
                callback(undefined, undefined);
            }
        }
    }),
    PlanetRepositoryRemove: jest.fn((id, callback) => {
        if(id % 2 === 0){
            callback(undefined, true);
        }else{
            callback(undefined, false);
        }
    }),
    PlanetRepositoryError: jest.fn((value, callback) => {
        callback(new Error());
    })
};
