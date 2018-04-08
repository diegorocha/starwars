const mongoose = require('mongoose');

class MongoRepository{
    static _getUri(){
        return process.env.MONGO_URL;
    }

    static async getConnection() {
        return await mongoose.createConnection(this._getUri());
    }

    static connect(){
        return mongoose.connect(this._getUri());
    }
}

module.exports = MongoRepository;
