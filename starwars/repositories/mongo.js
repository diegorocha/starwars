const mongoose = require('mongoose');
const config = require('../config');

class MongoRepository{
    static _getUri(){
        return config.MONGO_URL;
    }

    static async getConnection() {
        return await mongoose.createConnection(this._getUri());
    }

    static connect(){
        return mongoose.connect(this._getUri());
    }
}

module.exports = MongoRepository;
