# Inventory Management System - API Documentation

## Cấu trúc dự án
```
NNPTUD_25-3/
├── config/
│   └── database.js          # Kết nối MongoDB
├── models/
│   ├── Product.js           # Model Sản phẩm
│   └── Inventory.js         # Model Kho hàng
├── controllers/
│   └── inventoryController.js  # Xử lý logic
├── routes/
│   └── inventory.js         # Định tuyến API
├── server.js                # Server chính
├── .env                     # Biến môi trường
└── package.json             # Dependencies
```

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình MongoDB
Mở file `.env` và cập nhật:
```
MONGODB_URI=mongodb://localhost:27017/inventory_db
PORT=3000
```

### 3. Chạy server
```bash
npm start        # Chế độ production
npm run dev      # Chế độ development (với nodemon)
```

---

## API Endpoints

### 1. **Tạo Sản phẩm (TỰ ĐỘNG TẠO INVENTORY)**
**Endpoint:** `POST /api/products`

**Request:**
```json
{
  "name": "Laptop Dell",
  "price": 15000000,
  "description": "Laptop gaming mạnh mẽ"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "price": 15000000,
      "description": "Laptop gaming mạnh mẽ",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "inventory": {
      "_id": "507f1f77bcf86cd799439012",
      "product": "507f1f77bcf86cd799439011",
      "stock": 0,
      "reserved": 0,
      "soldCount": 0,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

### 2. **Lấy tất cả Inventory (với thông tin Product)**
**Endpoint:** `GET /api/inventories`

**Response (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách inventory thành công",
  "total": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "product": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Laptop Dell",
        "price": 15000000,
        "description": "Laptop gaming mạnh mẽ"
      },
      "stock": 50,
      "reserved": 10,
      "soldCount": 30,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 3. **Lấy Inventory theo ID (với thông tin Product)**
**Endpoint:** `GET /api/inventories/:id`

**Example:** `GET /api/inventories/507f1f77bcf86cd799439012`

**Response (200):**
```json
{
  "success": true,
  "message": "Lấy inventory thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "price": 15000000,
      "description": "Laptop gaming mạnh mẽ"
    },
    "stock": 50,
    "reserved": 10,
    "soldCount": 30,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 4. **Thêm Stock**
**Endpoint:** `POST /api/add-stock`

**Request:**
```json
{
  "product": "507f1f77bcf86cd799439011",
  "quantity": 20
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Thêm stock thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "price": 15000000
    },
    "stock": 70,      // Tăng từ 50 lên 70
    "reserved": 10,
    "soldCount": 30,
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

### 5. **Giảm Stock**
**Endpoint:** `POST /api/remove-stock`

**Request:**
```json
{
  "product": "507f1f77bcf86cd799439011",
  "quantity": 5
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Giảm stock thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "price": 15000000
    },
    "stock": 65,      // Giảm từ 70 xuống 65
    "reserved": 10,
    "soldCount": 30,
    "updatedAt": "2024-01-15T11:05:00Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Stock không đủ. Stock hiện tại: 5"
}
```

---

### 6. **Đặt Hàng (Reservation) - Giảm Stock, Tăng Reserved**
**Endpoint:** `POST /api/reservation`

**Request:**
```json
{
  "product": "507f1f77bcf86cd799439011",
  "quantity": 10
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Đặt hàng thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "price": 15000000
    },
    "stock": 55,       // Giảm từ 65 xuống 55
    "reserved": 20,    // Tăng từ 10 lên 20
    "soldCount": 30,
    "updatedAt": "2024-01-15T11:10:00Z"
  }
}
```

---

### 7. **Hoàn tất Bán Hàng (Sold) - Giảm Reserved, Tăng SoldCount**
**Endpoint:** `POST /api/sold`

**Request:**
```json
{
  "product": "507f1f77bcf86cd799439011",
  "quantity": 8
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Bán hàng thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "price": 15000000
    },
    "stock": 55,
    "reserved": 12,    // Giảm từ 20 xuống 12
    "soldCount": 38,   // Tăng từ 30 lên 38
    "updatedAt": "2024-01-15T11:15:00Z"
  }
}
```

---

## Quy trình hoạt động

### Ví dụ: Luồng đơn hàng hoàn chỉnh

**Bước 1: Tạo sản phẩm**
```bash
POST /api/products
{
  "name": "iPhone 15",
  "price": 25000000,
  "description": "iPhone mới nhất"
}
```
→ Tự động tạo Inventory với stock=0, reserved=0, soldCount=0

**Bước 2: Nhập hàng (Thêm Stock)**
```bash
POST /api/add-stock
{
  "product": "product_id",
  "quantity": 100
}
```
→ stock: 0 → 100, reserved: 0, soldCount: 0

**Bước 3: Khách hàng đặt hàng (Reservation)**
```bash
POST /api/reservation
{
  "product": "product_id",
  "quantity": 5
}
```
→ stock: 100 → 95, reserved: 0 → 5, soldCount: 0

**Bước 4: Giao hàng + hoàn tát đơn (Sold)**
```bash
POST /api/sold
{
  "product": "product_id",
  "quantity": 5
}
```
→ stock: 95, reserved: 5 → 0, soldCount: 0 → 5

---

## Các lỗi thường gặp

| Status | Message | Nguyên nhân |
|--------|---------|-----------|
| 400 | Stock không đủ | Cố gắng giảm/đặt hàng nhiều hơn stock hiện có |
| 400 | Reserved không đủ | Cố gắng bán nhiều hơn reserved hiện có |
| 404 | Không tìm thấy inventory | Product ID không tồn tại |
| 400 | Vui lòng cung cấp dữ liệu | Thiếu trường bắt buộc |
| 500 | Có lỗi xảy ra trên server | Lỗi database |

---

## Postman Collection

Bạn có thể import các URL này vào Postman:

```
1. POST   http://localhost:3000/api/products
2. GET    http://localhost:3000/api/inventories
3. GET    http://localhost:3000/api/inventories/:id
4. POST   http://localhost:3000/api/add-stock
5. POST   http://localhost:3000/api/remove-stock
6. POST   http://localhost:3000/api/reservation
7. POST   http://localhost:3000/api/sold
8. GET    http://localhost:3000/health
```

---

## Mô hình dữ liệu (Schema)

### Product
```javascript
{
  _id: ObjectId,
  name: String (required),
  price: Number (required, min: 0),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Inventory
```javascript
{
  _id: ObjectId,
  product: ObjectId (ref: Product, required, unique),
  stock: Number (min: 0, default: 0),
  reserved: Number (min: 0, default: 0),
  soldCount: Number (min: 0, default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

---

**Phiên bản:** 1.0.0  
**Ngày tạo:** 2024-01-15
