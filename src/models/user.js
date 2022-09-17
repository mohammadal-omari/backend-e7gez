const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jkhdgjdugdfgdrfgretg');

const userSchema = new mongoose.Schema({
  firstname: { type: String, default: null, required: false },
  lastname: { type: String, default: null, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  phoneNumber: { type: String, default: 'xxxxxxxxxx', required: true },
  NonHashedPassword: { type: String, required: false },
  role: { type: String, default: "Admin", required: true },
  token: { type: String },
  isActive: { type: Boolean, required: true, default: true },
  point: { type: Number, default: 0, required: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
  imagePath: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'file' },
  userNumber: { type: Number, required: true, index: { unique: true } },
}, { collection: "user" });

userSchema.pre('save', async function (next) {
  //Check if password is not modified
  if (!this.isModified('password')) {
    return next();
  }
  const encryptedString = cryptr.encrypt(this.NonHashedPassword);
  //Encrypt the password
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.NonHashedPassword = encryptedString;
    next();
  } catch (e) {
    return next(e);
  }
});

userSchema.methods.isPasswordMatch = async function (password, hashed, callback) {
  bcrypt.compare(password, hashed, (err, success) => {
    if (err) {
      return callback(err);
    }
    callback(null, success);
  });
};

userSchema.methods.toJSON = function () {
  const UserObject = this.toObject();
  delete UserObject.password;
  const decryptedString = cryptr.decrypt(UserObject.NonHashedPassword);
  UserObject.NonHashedPassword = decryptedString;
  return UserObject;
};

userSchema.plugin(autoIncrement.plugin, {
  model: 'user',
  field: 'userNumber',
  startAt: (new Date()).getUTCFullYear() + 30 * 2,
  incrementBy: 2
})
module.exports = mongoose.model("user", userSchema); 
