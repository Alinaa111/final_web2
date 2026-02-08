const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateStock,
  deleteProduct,
  addReview,
  getFeaturedProducts
} = require('../controllers/productController');
const { protect, authorizeAdmin, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes (require login)
router.post('/:id/reviews', protect, addReview);

// Admin & Seller routes
router.post('/', protect, authorizeRoles('admin', 'seller'), createProduct);
router.patch('/:id', protect, authorizeRoles('admin', 'seller'), updateProduct);
router.patch('/:id/stock', protect, authorizeRoles('admin', 'seller'), updateStock);
router.delete('/:id', protect, authorizeRoles('admin', 'seller'), deleteProduct);

module.exports = router;
