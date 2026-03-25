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

// Kết nối MongoDB và tạo collection
async function setupDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/inventory_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Đã kết nối thành công với MongoDB');

    // Tạo collection nếu chưa tồn tại
    const collections = await mongoose.connection.db.listCollections().toArray();
    const inventoryExists = collections.some(col => col.name === 'inventories');

    if (!inventoryExists) {
      // Tạo một document mẫu để tạo collection
      const sampleInventory = new Inventory({
        product: new mongoose.Types.ObjectId(),
        stock: 0,
        reserved: 0,
        soldCount: 0
      });

      await sampleInventory.save();
      console.log('✅ Đã tạo collection "inventories"');

      // Xóa document mẫu
      await Inventory.deleteMany({});
      console.log('✅ Đã xóa document mẫu');
    } else {
      console.log('✅ Collection "inventories" đã tồn tại');
    }

    // Hiển thị thông tin collection
    const count = await Inventory.countDocuments();
    console.log(`📊 Collection "inventories" có ${count} documents`);

    console.log('🎉 Thiết lập database hoàn tất!');

  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Đã đóng kết nối MongoDB');
  }
}

setupDatabase();
