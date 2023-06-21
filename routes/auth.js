const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
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
router.post(
  "/google",
  [check("id_token", "ID_Token is requiere").not().isEmpty(), validateFields],
  googleSignIn
);


module.exports = router;