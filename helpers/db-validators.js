
const Role = require("../models/role");
const User = require("../models/user");
const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role ${role} is not register in DB`);
  }
};

const existEmail = async( email = '') => {
  // Check mail
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    throw new Error(`This email: ${email}, already exist`)
  }
}
const existID = async( id) => {
  // Check user by ID
  const isUser = await User.findById(id );
  if (!isUser) {
    throw new Error(`This ID: ${id}, doesn't exist`)
  }
}

module.exports = {
  isValidRole,
  existEmail,
  existID
};