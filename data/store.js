// data/store.js

// Simple in-memory store for products. This keeps the starter products used previously.

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

function getAll() {
  return products.slice();
}

function getById(id) {
  return products.find(p => p.id === id) || null;
}

function create(product) {
  products.push(product);
}

function update(id, updated) {
  products = products.map(p => (p.id === id ? updated : p));
}

function remove(id) {
  products = products.filter(p => p.id !== id);
}

module.exports = { getAll, getById, create, update, remove };
