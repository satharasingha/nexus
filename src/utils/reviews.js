import api from "./api";


/**
 * Create a new review (auth required)
 * @param {Object} data - { productId, productName, rating, text }
 */
export const createReview = (data) => api.post("/reviews", data);

/**
 * Get approved reviews (public)
 * Used on homepage testimonials
 * @param {number} limit - max number of reviews
 */
export const getApprovedReviews = (limit = 6) =>
    api.get(`/reviews?approved=true&limit=${limit}`);

/**
 * Get approved reviews for a specific product (public)
 * Used on product overview page
 * @param {string} productId
 */
export const getProductReviews = (productId) =>
    api.get(`/reviews/product/${productId}`);

/**
 * Admin: approve a review
 * @param {string} id - review _id
 */
export const approveReview = (id) => api.put(`/reviews/${id}/approve`);

/**
 * Admin: delete a review
 * @param {string} id - review _id
 */
export const deleteReview = (id) => api.delete(`/reviews/${id}`);