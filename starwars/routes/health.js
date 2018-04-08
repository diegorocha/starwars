const express = require('express');
const router = express.Router();
const MongoRepository = require('../repositories/mongo');

/* GET ping page. */
router.get('/ping', function(req, res, next) {
  res.send('Pong');
});

/* GET healthcheck page. */
router.get('/healthcheck', async function(req, res, next) {
    MongoRepository.getConnection().then(value => {
        let health = {
            'node': 'OK',
            'mongo': value._readyState ===1 ? 'OK' : 'Not OK'
        };
        value.close();
        res.send(health);
    }, () =>{
        res.send({
            'node': 'OK',
            'mongo': 'Not OK'
        });
    });
});

module.exports = router;
