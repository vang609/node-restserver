const { response, request } = require("express");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')
    console.log({token})

    if(!token){
        return res.status(401).json({
            msg: 'No request Token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById( uid );
        // Verify if uid is on status true
        if(!user){
             return res.status(401).json({
               msg: "Token no valid - user not exist DB",
             });
        }
        if(!user.status){
             return res.status(401).json({
               msg: "Token no valid - user status: false",
             });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
          msg: "Token no valid",
        });
        
    }


}

module.exports = {
  validateJWT,
};