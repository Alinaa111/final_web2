const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, authorizeAdmin, authorizeRoles } = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/me', getMyOrders);
router.get('/:id', getOrderById);
router.delete('/:id', cancelOrder);

// Admin & Seller routes
router.get('/', authorizeRoles('admin', 'seller'), getAllOrders);
router.patch('/:id/status', authorizeRoles('admin', 'seller'), updateOrderStatus);

module.exports = router;
