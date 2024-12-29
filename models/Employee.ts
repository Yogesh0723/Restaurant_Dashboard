import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['waiter', 'chef', 'manager', 'cashier'],
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  attendance: [{
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'half-day', 'leave'],
      required: true,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);