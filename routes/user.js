
const { Router} = require('express');
const { check } = require('express-validator');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/users');
const { validateFields } = require('../middlewares/field-validations');
const {
  isValidRole,
  existEmail,
  existID,
} = require("../helpers/db-validators");


const router = Router();

 router.get("/", getUsers);

 router.post(
   "/",
   [
     check("name", "Name is require").not().isEmpty(),
     check("password", "Password length at least 6 characters").isLength({
       min: 6,
     }),
     check("email", "Email no valid").isEmail(),
     check("email").custom(existEmail),
     check("role").custom(isValidRole),
     //   check("role", "Role no valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
     validateFields,
   ],
   postUsers
 );

 router.put(
   "/:id",
   [
     check("id", "Not a valid ID").isMongoId(),
     check("id").custom(existID),
     check("role").custom(isValidRole),
     validateFields,
   ],
   putUsers
 );


 router.delete("/:id",
 [
     check("id", "Not a valid ID").isMongoId(),
     check("id").custom(existID),
     validateFields,
   ],
  deleteUsers);



module.exports = router;