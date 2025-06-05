const express = require('express');
const router = express.Router();
const { adminStats } = require('./admin.stats');
const { createModuleLogger } = require('../config/logger');

const logger = createModuleLogger('admin-routes');

// Admin stats endpoint
router.get('/stats', adminStats);

logger.info('Admin routes initialized');

module.exports = router; 