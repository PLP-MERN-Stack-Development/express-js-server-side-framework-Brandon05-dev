// scripts/inspectRoutes.js
const app = require('../server');

function listRoutes(layer, prefix = '') {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
    console.log(`${methods} ${prefix}${layer.route.path}`);
  } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    const newPrefix = prefix + (layer.regexp && layer.regexp.source !== '^\\/?$' ? layer.regexp.source.replace('^\\/?','').replace('\\/?$','') : '');
    layer.handle.stack.forEach(l => listRoutes(l, prefix));
  }
}

app._router.stack.forEach(l => listRoutes(l));
