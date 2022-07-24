import mongoose from "mongoose";
// Validator package for string validation and sanitation
import validator from "validator";
// Import bcrypt for the hash password
import bcrypt from "bcryptjs";
// Import JWT
import jwt from "jsonwebtoken";

// The structure for the User model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "lastName",
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my city",
  },
});

// Pre save hook to hash passwords before adding them to DB
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Custom document instance method
UserSchema.methods.createJWT = function () {
  // Put in payload the  "_id" field from MongoDB which added automatically for each user as unique id. Get the secret key and token duration from .env file
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Custom document instance method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // Compare the passwords, return true if they are matched.
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Setup the User model from schema above and export it
export default mongoose.model("User", UserSchema);
