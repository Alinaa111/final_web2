import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getById(id);
      const productData = response.data.data;

      setProduct(productData);

      // Set default color, size, and main image
      if (productData.colors && productData.colors.length > 0) {
        const firstColor = productData.colors[0];

        setSelectedColor(firstColor.name);

        if (firstColor.sizes && firstColor.sizes.length > 0) {
          setSelectedSize(firstColor.sizes[0].size);
        }

        setDisplayImage(firstColor.imageUrl || productData.mainImage);
      } else {
        setDisplayImage(productData.mainImage);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedColorObj = useMemo(() => {
    if (!product || !selectedColor) return null;
    return product.colors?.find(c => c.name === selectedColor) || null;
  }, [product, selectedColor]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setMessage({ type: 'error', text: 'Please select color and size' });
      return;
    }

    addToCart(product, selectedColor, selectedSize, quantity);
    setMessage({ type: 'success', text: 'Added to cart!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setMessage({ type: 'error', text: 'Please login to submit a review' });
      return;
    }

    try {
      await productService.addReview(id, review);
      setMessage({ type: 'success', text: 'Review submitted successfully!' });
      setShowReviewForm(false);
      setReview({ rating: 5, comment: '' });
      fetchProduct(); // Refresh product data
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit review'
      });
    }
  };

  const getAvailableSizes = () => {
    if (!selectedColorObj) return [];
    return selectedColorObj.sizes || [];
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/shop')}>
        ← Back to Shop
      </button>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="product-detail-container">
        {/* Product Images */}
        <div className="product-images">
          <img
            src={displayImage || product.mainImage}
            alt={product.name}
            className="main-image"
          />

          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="additional-images">
              {product.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  onClick={() => setDisplayImage(img)} // optional: click thumb -> main image
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <span className="brand">{product.brand}</span>
          <h1>{product.name}</h1>

          {/* Rating */}
          {product.averageRating > 0 && (
            <div className="rating-section">
              <div className="stars">
                {'⭐'.repeat(Math.round(product.averageRating))}
              </div>
              <span>
                {product.averageRating.toFixed(1)} ({product.totalReviews} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="price-section">
            {product.discountPercentage > 0 ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="sale-price">${product.finalPrice}</span>
                <span className="discount-badge">{product.discountPercentage}% OFF</span>
              </>
            ) : (
              <span className="price">${product.price}</span>
            )}
          </div>

          {/* Description */}
          <p className="description">{product.description}</p>

          {/* Color Selection */}
          <div className="selection-group">
            <label>Color</label>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedColor(color.name);

                    // ✅ change main image per color
                    setDisplayImage(color.imageUrl || product.mainImage);

                    // Reset size when color changes
                    if (color.sizes?.length > 0) {
                      setSelectedSize(color.sizes[0].size);
                    } else {
                      setSelectedSize(null);
                    }
                  }}
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                >
                  {selectedColor === color.name && '✓'}
                </button>
              ))}
            </div>
            <span className="selected-color-name">{selectedColor}</span>
          </div>

          {/* Size Selection */}
          <div className="selection-group">
            <label>Size</label>
            <div className="size-options">
              {getAvailableSizes().map(sizeObj => (
                <button
                  key={sizeObj.size}
                  className={`size-option ${selectedSize === sizeObj.size ? 'selected' : ''} ${sizeObj.stock === 0 ? 'out-of-stock' : ''}`}
                  onClick={() => setSelectedSize(sizeObj.size)}
                  disabled={sizeObj.stock === 0}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="selection-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Product Details */}
          <div className="product-details">
            <h3>Product Details</h3>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Gender:</strong> {product.gender}</li>
              {product.tags && product.tags.length > 0 && (
                <li><strong>Tags:</strong> {product.tags.join(', ')}</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          {isAuthenticated && !showReviewForm && (
            <button
              className="write-review-btn"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>
                    {num} Stars
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                required
                rows="4"
                placeholder="Share your experience with this product..."
              />
            </div>
            <div className="form-actions">
              <button type="submit">Submit Review</button>
              <button type="button" onClick={() => setShowReviewForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={review._id || index} className="review-item">
                <div className="review-header">
                  <strong>{review.userName}</strong>
                  <div className="stars">{'⭐'.repeat(review.rating)}</div>
                </div>
                <p>{review.comment}</p>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;