import mongoose from "mongoose";
// Validator for string validation and sanitation
import validator from "validator";
import bcrypt from "bcryptjs";

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

// Setup the User model from schema above and export it
export default mongoose.model("User", UserSchema);
