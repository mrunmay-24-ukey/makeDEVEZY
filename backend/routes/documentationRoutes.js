const express = require('express');
const router = express.Router();
const documentationController = require('../controllers/documentationController');

router.post('/fetch-repo', documentationController.fetchRepository);
router.post('/generate', documentationController.generateDocumentation);
router.post('/fetch-file', documentationController.fetchFileContent);

module.exports = router;