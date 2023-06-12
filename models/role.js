const { Schema, model } = require("mongoose");


const roleSchema = Schema({ 
role:{
    type: String,
    require: [true, 'Role is requiere']
}


})

module.exports = model("Role", roleSchema);