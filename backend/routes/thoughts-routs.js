const express = require('express');
const thoughtsControllers = require('../controllers/thoughts-controllers');

const router = express.Router();

router.get('/', thoughtsControllers.getThoughts);

router.post('/', thoughtsControllers.createThoughts);

module.exports = router;