const { response, json } = require('express')
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const createJWT = require('../helpers/createJWT');
const { googleVerify } = require('../helpers/google-verification');

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  // console.log(">>>> id_token ", id_token);

  try {
    const { name, picture, email } = await googleVerify(id_token);
    console.log("email:::> ", email);

    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "Blocked User",
      });
    }

      // Generate JWT

     const token = await createJWT(user.id);

       res.json({
         user,
         token,
       });

    
  } catch (error) {
    res.status(400).json({
      msg: "Google Token no valid",
    });
    
  }

 
};


module.exports = {
  login,
  googleSignIn,
};