// project/models/Table.ts
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu', // Ensure this references the Menu model
    required: true,
  },
  menuItemName: {
    type: String,
    required: true,
  },
  menuItemCategory: {
    type: String,
    required: true,
    enum: ['starters', 'main', 'desserts', 'beverages'], // Match the categories in Menu
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  subtotal: Number,
  discount: Number,
  total: Number,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

const billSchema = new mongoose.Schema({
  kotNumber: {
    type: String,
    required: true,
    unique: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  order: orderSchema,
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  settledAt: Date
});

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'cleaning'],
    default: 'available',
  },
  currentOrder: orderSchema,
  orderHistory: [orderSchema],
  bills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill'
  }]
});

export const Bill = mongoose.models.Bill || mongoose.model('Bill', billSchema);
export const Table = mongoose.models.Table || mongoose.model('Table', tableSchema);