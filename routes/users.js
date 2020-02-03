var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*cool route*/
router.get('/cool', (req, res) => {
    res.send("You're so cool");
});

module.exports = router;