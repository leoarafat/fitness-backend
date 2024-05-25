import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
const InterestSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});
const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,

      required: true,
    },
    user_name: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'SUPER_ADMIN', 'USER'],
      default: 'USER',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    profile_image: {
      type: String,
    },
    cover_image: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    interests: [InterestSchema],
    work_position: {
      type: String,
    },
    education: {
      type: String,
    },
    language: {
      type: String,
    },
    relationship_status: {
      type: String,
    },
    have_kids: {
      type: String,
    },
    smoke: {
      type: String,
    },
    drink: {
      type: String,
    },
    height: {
      type: String,
    },
    body_type: {
      type: String,
    },
    eyes: {
      type: String,
    },
    looking_for: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    verifyCode: {
      type: String,
    },
    verifyExpire: {
      type: Date,
    },
    plan_type: {
      type: String,
      enum: ['free', 'basic', 'gold', 'premium'],
      default: 'free',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Create a unique index for phoneNumber field
// Check if User exists
UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, '_id' | 'password' | 'phone_number' | 'role'> | null> {
  return await User.findOne(
    { email },
    {
      _id: 1,
      email: 1,
      password: 1,
      role: 1,
      phone_number: 1,
    },
  );
};

// Check password match
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Statics
const User = model<IUser, UserModel>('User', UserSchema);

export default User;
