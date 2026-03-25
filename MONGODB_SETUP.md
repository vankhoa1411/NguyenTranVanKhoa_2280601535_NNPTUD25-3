# Hướng dẫn thiết lập MongoDB và tạo Collection Inventory

## 🚀 Bước 1: Khởi động MongoDB

### Cách 1: Khởi động tạm thời (khuyên dùng)
1. Mở **Command Prompt** với quyền **Administrator**
2. Chạy lệnh sau:
```cmd
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
```
3. Terminal sẽ hiển thị MongoDB đang chạy. **Đừng đóng cửa sổ này!**

### Cách 2: Cài đặt như Windows Service
1. Mở **Command Prompt** với quyền **Administrator**
2. Chạy lệnh cài đặt service:
```cmd
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg" --install
```
3. Khởi động service:
```cmd
net start MongoDB
```

## 🚀 Bước 2: Tạo Collection Inventory

Sau khi MongoDB đã chạy, mở terminal mới và chạy:

```bash
cd "c:\Users\Khoa\Desktop\NNPTUD\NNPTUD_25-3"
node create-collection.js
```

## 📋 Schema Inventory sẽ được tạo:

```javascript
{
  product: {
    type: ObjectId,     // Tham chiếu đến Product
    ref: 'Product',     // Collection reference
    required: true,     // Bắt buộc
    unique: true        // Duy nhất
  },
  stock: {
    type: Number,       // Số lượng tồn kho
    required: true,
    min: 0,            // Không âm
    default: 0
  },
  reserved: {
    type: Number,       // Số lượng đã đặt hàng
    required: true,
    min: 0,
    default: 0
  },
  soldCount: {
    type: Number,       // Số lượng đã bán
    required: true,
    min: 0,
    default: 0
  },
  createdAt: Date,      // Thời gian tạo
  updatedAt: Date       // Thời gian cập nhật
}
```

## 🚀 Bước 3: Chạy Server

Sau khi tạo collection thành công:

```bash
npm install
npm start
```

Server sẽ chạy trên `http://localhost:3000`

## 📊 Kiểm tra Database

Để xem collection đã tạo:

1. Mở MongoDB Compass hoặc MongoDB Shell
2. Kết nối đến: `mongodb://localhost:27017`
3. Chọn database: `inventory_db`
4. Xem collection: `inventories`

## 🔧 Troubleshooting

### Lỗi "TCP connect failed"
- MongoDB chưa được khởi động
- Thực hiện Bước 1 lại

### Lỗi "Permission denied"
- Chạy Command Prompt với quyền Administrator

### Lỗi "Data directory not found"
- Tạo thư mục: `mkdir C:\data\db`

---

**Tạo bởi:** GitHub Copilot  
**Ngày:** 25/03/2026
