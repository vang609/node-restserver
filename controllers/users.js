
const { response } = require('express')

const getUsers = (req, res = response) => {

   const { name = 'No name', apikey } = req.query;
   res.json({
     msg: "get API - controller",
     name,
     apikey
   });

}
const postUsers = (req, res = response) => {

    const { name, city } = req.body;

    res.json({
        msg: "Post API - controller",
        name, 
        city
    });

}
const putUsers = (req, res = response) => {

   const { id } = req.params;

   res.json({
     msg: "Put API - controller",
     id
   });

}
const deleteUsers = (req, res = response) => {
   res.json({
     msg: "Delete API - controller",
   });

}


   module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}