import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model('user', UserSchema);
