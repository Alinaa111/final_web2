const express = require('express');
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updateItemStatus,
  cancelOrder
} = require('../controllers/orderController');

const { protect, authorizeRoles } = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/me', getMyOrders);

// Admin & Seller routes
router.get('/', authorizeRoles('admin', 'seller'), getAllOrders);
router.patch('/:id/status', authorizeRoles('admin', 'seller'), updateOrderStatus);

// Seller item-status route 
router.patch('/:orderId/items/:itemIndex/status', authorizeRoles('seller'), updateItemStatus);

// Single order + cancel 
router.get('/:id', getOrderById);
router.delete('/:id', cancelOrder);

module.exports = router;
