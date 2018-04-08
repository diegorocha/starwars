const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const MongoRepository = require('../repositories/mongo');


const PlanetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    climate: {
        type: String,
        required: true
    },
    terrain: {
        type: String,
        required: true
    }
});

async function initializeAutoIncrement () {
    try {
        let connection = await MongoRepository.getConnection();
        autoIncrement.initialize(connection);
        PlanetSchema.plugin(autoIncrement.plugin, 'Planet');
    } catch (e) {
        console.log("Error initializing auto increment", e);
    }
}

initializeAutoIncrement();
module.exports = mongoose.model('Planet', PlanetSchema);
