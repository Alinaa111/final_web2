const express = require('express');
const router = express.Router();

const { protect, authorizeRoles } = require('../middleware/auth');
const { getUsers, updateUserRole } = require('../controllers/userController');

router.use(protect);

router.get('/', authorizeRoles('admin'), getUsers);
router.patch('/:id/role', authorizeRoles('admin'), updateUserRole);

module.exports = router;
