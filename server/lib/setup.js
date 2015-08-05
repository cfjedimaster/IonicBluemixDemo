var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// log all requests
router.all('*', function(req, res, next){
	req.logger.info("Received request to " + req.url);
	next();
});

module.exports = exports = router;
