const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const locationSchema = mongoose.Schema({
  state: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  phoneNumber: {
    type: String,
    // required: [true, "please provide a phone number"],
    maxlength: 11,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  // dateOfBirth: {
  //   type: Date,
  //   required: [true, "please provide a dateOfBirth"],
  // },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
    maxlength: 50,
  },
  location: [locationSchema],
  // passwordToken: {
  //   type: String,
  //   required: [true, "Please provide passwordToken"],
  // },
  // passwordTokenExpirationDate: {
  //   type: Date,
  //   required: [true],
  // },
  // verificationToken: {
  //   type: String,
  //   required: [true, "Please provide verificationToken"],
  // },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  // verified: {
  //   type: Date,
  // },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));

  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("Users", UserSchema);
