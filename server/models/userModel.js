const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, minlength: 3 },
  email: { type: String, minlength: 6, required: true, unique: true },
  password: { type: String, minlength: 6, required: true },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
});

// 新用戶或密碼被修改，則對密碼進行hash
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified) {
      const hashPassword = await bcrypt.hash(this.password, 10);
      this.password = hashPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
