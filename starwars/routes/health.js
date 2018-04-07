var express = require('express');
var router = express.Router();
var MongoConnection = require('../repositories/mongo');

/* GET ping page. */
router.get('/ping', function(req, res, next) {
  res.send('Pong');
});

/* GET healthcheck page. */
router.get('/healthcheck', async function(req, res, next) {
    let mongoConnectionTest = await MongoConnection.testConnection();
    let health = {
        'node': 'OK',
        'mongo': mongoConnectionTest ? 'OK' : 'Not OK'
    };
    res.send(health);
});

module.exports = router;
