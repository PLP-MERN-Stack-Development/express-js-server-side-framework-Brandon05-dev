# Express.js RESTful API - Product Management

A complete RESTful API built with Express.js for managing products. Features proper routing, middleware, authentication, validation, and error handling.

## Features

✅ **Full CRUD Operations** for products  
✅ **Authentication** via API keys  
✅ **Input Validation** with detailed error messages  
✅ **Advanced Filtering** by category  
✅ **Search Functionality** by product name  
✅ **Pagination Support** for large datasets  
✅ **Product Statistics** endpoint  
✅ **Comprehensive Error Handling**  
✅ **Request Logging** middleware  

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment (optional):**
   ```bash
   cp .env.example .env
   # Edit .env to set custom API_KEY if desired
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. **Test the API:**
   ```bash
   curl http://localhost:3000/api/products
   ```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### **GET /api/products**
List all products with optional filtering, search, and pagination.

**Query Parameters:**
- `category` - Filter by product category
- `search` - Search products by name (case-insensitive)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Examples:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Filter by category
curl http://localhost:3000/api/products?category=electronics

# Search by name
curl http://localhost:3000/api/products?search=laptop

# Pagination
curl http://localhost:3000/api/products?page=2&limit=5

# Combined filters
curl http://localhost:3000/api/products?category=electronics&search=phone&limit=2
```

**Response:**
```json
{
  "total": 2,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

#### **GET /api/products/:id**
Get a specific product by ID.

**Example:**
```bash
curl http://localhost:3000/api/products/1
```

**Response:**
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

#### **GET /api/products/stats**
Get product statistics including total count and count by category.

**Example:**
```bash
curl http://localhost:3000/api/products/stats
```

**Response:**
```json
{
  "total": 3,
  "counts": {
    "electronics": 2,
    "kitchen": 1
  }
}
```

### Protected Endpoints (Require API Key)

For the following endpoints, include the header: `x-api-key: secret-api-key`

#### **POST /api/products**
Create a new product.

**Headers:**
```
Content-Type: application/json
x-api-key: secret-api-key
```

**Body:**
```json
{
  "name": "Blender",
  "description": "450W high-speed blender",
  "price": 89.99,
  "category": "kitchen",
  "inStock": true
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key" \
  -d '{"name":"Blender","description":"450W blender","price":89.99,"category":"kitchen","inStock":true}'
```

**Response:** `201 Created`
```json
{
  "id": "generated-uuid",
  "name": "Blender",
  "description": "450W blender",
  "price": 89.99,
  "category": "kitchen",
  "inStock": true
}
```

#### **PUT /api/products/:id**
Update an existing product.

**Headers & Body:** Same as POST

**Example:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key" \
  -d '{"name":"Gaming Laptop","description":"High-end gaming laptop","price":1599,"category":"electronics","inStock":true}'
```

**Response:** `200 OK` with updated product

#### **DELETE /api/products/:id**
Delete a product.

**Headers:**
```
x-api-key: secret-api-key
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "x-api-key: secret-api-key"
```

**Response:** `204 No Content`

## Error Responses

The API returns consistent error responses:

**400 Bad Request** (Validation Error):
```json
{
  "error": "name is required and must be a string; price is required and must be a number"
}
```

**401 Unauthorized** (Missing API Key):
```json
{
  "error": "Missing API key"
}
```

**403 Forbidden** (Invalid API Key):
```json
{
  "error": "Invalid API key"
}
```

**404 Not Found**:
```json
{
  "error": "Product not found"
}
```

## Project Structure

```
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variables template
├── middleware/
│   ├── logger.js             # Request logging
│   ├── auth.js               # API key authentication
│   └── validateProduct.js    # Product validation
├── routes/
│   └── products.js           # Product routes
├── controllers/
│   └── productsController.js # Business logic
├── data/
│   └── store.js              # In-memory data store
└── errors/
    ├── customErrors.js       # Custom error classes
    └── errorHandler.js       # Global error handling
```

## Development

**Install nodemon** (included in package.json):
```bash
npm run dev
```

This will start the server with auto-reload on file changes.

## Testing

The API has been tested with curl for all endpoints. You can also use:
- **Postman** - Import the endpoints above
- **Insomnia** - REST client
- **VS Code REST Client** - If you have the extension

## Environment Variables

Copy `.env.example` to `.env` and customize:

```env
API_KEY=your-secret-api-key
PORT=3000
```

## Notes

- This uses an **in-memory store** - data resets when the server restarts
- In production, replace the data store with a real database (MongoDB, PostgreSQL, etc.)
- The API key authentication is basic - use JWT or OAuth in production
- All validation errors return detailed messages for easy debugging 