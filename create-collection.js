const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  reserved: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  soldCount: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);

async function createInventoryCollection() {
  try {
    console.log('🔄 Đang kết nối với MongoDB...');

    // Kết nối với timeout ngắn
    await mongoose.connect('mongodb://localhost:27017/inventory_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout 5 giây
    });

    console.log('✅ Đã kết nối thành công với MongoDB');

    // Kiểm tra collection đã tồn tại chưa
    const collections = await mongoose.connection.db.listCollections().toArray();
    const inventoryExists = collections.some(col => col.name === 'inventories');

    if (!inventoryExists) {
      console.log('📝 Đang tạo collection "inventories"...');

      // Tạo collection bằng cách insert document mẫu
      const sampleInventory = new Inventory({
        product: new mongoose.Types.ObjectId(),
        stock: 0,
        reserved: 0,
        soldCount: 0
      });

      await sampleInventory.save();
      console.log('✅ Đã tạo collection "inventories" thành công');

      // Xóa document mẫu
      await Inventory.deleteMany({});
      console.log('🗑️ Đã xóa document mẫu');
    } else {
      console.log('✅ Collection "inventories" đã tồn tại');
    }

    // Hiển thị thông tin schema
    console.log('\n📋 Thông tin Schema Inventory:');
    console.log('- product: ObjectId (ref: Product, required, unique)');
    console.log('- stock: Number (min: 0, default: 0)');
    console.log('- reserved: Number (min: 0, default: 0)');
    console.log('- soldCount: Number (min: 0, default: 0)');
    console.log('- timestamps: true (createdAt, updatedAt)');

    // Đếm số documents
    const count = await Inventory.countDocuments();
    console.log(`\n📊 Collection "inventories" hiện có ${count} documents`);

    console.log('\n🎉 Thiết lập database hoàn tất!');
    console.log('🚀 Bạn có thể chạy server bằng: npm start');

  } catch (error) {
    console.error('\n❌ Lỗi kết nối MongoDB:');
    console.error(error.message);

    console.log('\n🔧 Hướng dẫn khắc phục:');
    console.log('1. Khởi động MongoDB:');
    console.log('   - Mở Command Prompt với quyền Administrator');
    console.log('   - Chạy: "C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe" --dbpath "C:\\data\\db"');
    console.log('');
    console.log('2. Hoặc cài đặt MongoDB như service:');
    console.log('   - Mở Command Prompt với quyền Administrator');
    console.log('   - Chạy: "C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe" --config "C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.cfg" --install');
    console.log('   - Sau đó: net start MongoDB');
    console.log('');
    console.log('3. Sau khi MongoDB chạy, chạy lại script này: node create-collection.js');

  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('\n🔌 Đã đóng kết nối MongoDB');
    }
  }
}

createInventoryCollection();
