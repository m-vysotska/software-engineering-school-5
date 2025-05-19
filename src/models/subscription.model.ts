import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Email validation
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'], // Enum values
      default: 'daily',
    },
    lastSent: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Pre-save hook to lowercase the email
subscriptionSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;