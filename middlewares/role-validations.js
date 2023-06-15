const { response } = require("express")


const validateRole =  (req, res = response, next) => {

    if(!req.user) {
        return res.status(500).json({
            msg: 'Require validate Role  without validate token first'
        })
    }

    const {role, name } = req.user;

    console.log("role ", role);

    if (role != 'ADMIN_ROLE') {
      return res.status(401).json({
        msg: `${ name } is not administrator - No privileges`
      });
    }

    next();

}

const haveRole = (...roles) =>{

    return (req, res = response, next) => {

            if (!req.user) {
              return res.status(401).json({
                msg: "Require validate Role  without validate token first",
              });
            }

        if (!roles.includes( req.user.role)) {
            return res.status(500).json({
                msg: `Service require one of this roles ${roles}`,
            });
        }
        next();
    }
}

module.exports = {
  validateRole,
  haveRole,
};