const { response } = require('express')
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const createJWT = require('../helpers/createJWT');

const login = async( req, res = response) =>{

    const { email, password } = req.body;

    try {
      // if email exist
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          msg: "User/Password not correct - email",
        });
      }

      // if user is active
      if (!user.status) {
        return res.status(400).json({
          msg: "User/Password not correct - status",
        });
      }

      // review passworld
      const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        msg: "User/Password not correct - pwd",
      });
    }

      // Generate JWT

      const token = await createJWT(user.id);

      res.json({
       user,
       token
      });
    } catch (error) {
        console.log(error)
         res.status(500).json({
            msg: 'Connect with IT Support'
        })
    }


    

}


module.exports = {
    login
}