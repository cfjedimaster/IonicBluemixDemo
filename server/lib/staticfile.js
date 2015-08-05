var express = require('express');
var router = express.Router();

//host static files in public folder
//URL:  http://${appHostName}.mybluemix.net/${appHostName}/v1/apps/${applicationId}/public/
router.use('/public', express.static('public'));

module.exports = exports = router;

