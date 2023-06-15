const validateFields  = require("../middlewares/field-validations");
const validateJWT  = require("../middlewares/jwt-validations");
const validateRoles  = require("../middlewares/role-validations");



module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};