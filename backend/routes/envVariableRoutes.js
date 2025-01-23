const express = require('express');
const router = express.Router();
const envVariableController = require('../controllers/envVariableController');

router.get('/' , envVariableController.getAllEnvVariables);

router.post('/' , envVariableController.createEnvVariable);

router.put('/:id', envVariableController.updateEnvVariable);

router.delete('/:name' , envVariableController.deleteEnvVariable);


module.exports = router;