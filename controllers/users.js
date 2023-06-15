
const { response } = require('express')
const bcryptjs = require('bcryptjs');


const User = require('../models/user')

const getUsers = async(req, res = response) => {

   const { limit = 5, from = 0 } = req.query;
   const queryStatus = { status: true };
   // const users = await User.find(queryStatus)
   //   .skip(Number(from))
   //   .limit(Number(limit));

   // const count = await User.countDocuments(queryStatus);

   // Two request that depend one of each other usin promise ALL

   const [count, users] = await Promise.all([
     User.countDocuments(queryStatus),
     User.find(queryStatus).skip(Number(from)).limit(Number(limit)),
   ]);

   res.json({ count, users });

}
const postUsers = async (req, res = response) => {
   const {name, email, password, role} = req.body;
   const user = new User({ name, email, password, role });

   // encryp
   const salt = bcryptjs.genSaltSync(10);
   user.password = bcryptjs.hashSync( password, salt);
   await user.save();

    res.json({
      msg: "Post API - controller",
      user,
    });

}
const putUsers = async(req, res = response) => {

   const { id } = req.params;
   const { _id, password, google, email, ...restArgs } = req.body;

   // Validar vs DB
   if(password){
      const salt = bcryptjs.genSaltSync(10);
      restArgs.password = bcryptjs.hashSync(password, salt);
   }

   const user = await User.findByIdAndUpdate(id, restArgs)
   res.json(user);

}
const deleteUsers = async(req, res = response) => {

   const { id } = req.params

   const uid = req.uid

   // Physical Delete
   // const user =  await User.findByIdAndDelete( id )

   // Just changing the state
   const user = await User.findByIdAndUpdate( id, { status: false})
   // const authenticateUser = req.user;

   res.json({
     user
   });

}


   module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}