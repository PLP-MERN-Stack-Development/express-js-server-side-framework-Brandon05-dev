// routes/products.js

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');
const { validateProductBody } = require('../middleware/validateProduct');

// GET /api/products - list, filter, paginate, search
router.get('/', productsController.listProducts);

// GET /api/products/stats - statistics (count by category)
router.get('/stats', productsController.productStats);

// GET /api/products/:id - get one product
router.get('/:id', productsController.getProductById);

// POST /api/products - create (protected)
router.post('/', auth, validateProductBody, productsController.createProduct);

// PUT /api/products/:id - update (protected)
router.put('/:id', auth, validateProductBody, productsController.updateProduct);

// DELETE /api/products/:id - remove (protected)
router.delete('/:id', auth, productsController.deleteProduct);

module.exports = router;
