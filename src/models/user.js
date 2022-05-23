const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
  firstname: { type: String, default: null, required: true },
  lastname: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  phoneNumber: { type:String,default:null },
  imagePath: { type:String,default:null },
  role: { type: String, default: "Admin" },
  token: { type: String },
  userNumber: { type: String, required: true, index: { unique: true } },
}, { collection: "user" }); 

userSchema.pre('save', async function (next) {
  //Check if password is not modified
  if (!this.isModified('password')) {
    return next();
  }
  //Encrypt the password
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
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
  return UserObject;
};

userSchema.plugin(autoIncrement.plugin,  {
  model: 'user',
  field: 'userNumber',
  startAt: (new Date()).getUTCFullYear()+30*2,
  incrementBy: 2
})
module.exports = mongoose.model("user", userSchema); 
