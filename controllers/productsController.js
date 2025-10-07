// controllers/productsController.js

const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { NotFoundError } = require('../errors/customErrors');

// GET /api/products
// Supports: ?category=electronics&page=1&limit=10&search=term
function listProducts(req, res, next) {
  try {
    let items = store.getAll();

    // Search by name (case-insensitive)
    if (req.query.search) {
      const q = req.query.search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q));
    }

    // Filter by category
    if (req.query.category) {
      items = items.filter(p => p.category === req.query.category);
    }

    // Pagination
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const start = (page - 1) * limit;
    const paged = items.slice(start, start + limit);

    res.json({ total: items.length, page, limit, data: paged });
  } catch (err) {
    next(err);
  }
}

function getProductById(req, res, next) {
  try {
    const product = store.getById(req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
}

function createProduct(req, res, next) {
  try {
    const newProduct = Object.assign({ id: uuidv4() }, req.body);
    store.create(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
}

function updateProduct(req, res, next) {
  try {
    const existing = store.getById(req.params.id);
    if (!existing) throw new NotFoundError('Product not found');
    const updated = Object.assign({}, existing, req.body);
    store.update(req.params.id, updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteProduct(req, res, next) {
  try {
    const existing = store.getById(req.params.id);
    if (!existing) throw new NotFoundError('Product not found');
    store.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

function productStats(req, res, next) {
  try {
    const items = store.getAll();
    const counts = items.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    res.json({ total: items.length, counts });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productStats
};
