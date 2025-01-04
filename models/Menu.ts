import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['starters', 'main', 'desserts', 'beverages', 'breakfast'],
  },
  type: {
    type: String,
    required: true,
    enum: ['veg', 'non-veg'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Menu || mongoose.model('Menu', MenuSchema);