const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/field-validations");



const router = Router();

router.post(
  "/login",
  [ 
    check("email", "Email no valid").isEmail(), 
    check("password", "Password is require").not().isEmpty(), 
    validateFields],
  login
);


module.exports = router;