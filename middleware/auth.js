// @ts-nocheck
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } 
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "You are not authorized to access this route",
    });
  }

  try {
    //Verify if token exists
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    
    
    
    req.user = await User.findById(decoded.id);
    
    
    
    next()
  } catch (error) {
    return res.status(401).json({
        success: false,
        msg: "You are not authorized to access this route",
      }); 
  }
};

//Grant authorization access to specific roles
exports.authorize = (...roles) => {
    // @ts-ignore
    return (req, res, next) => {
      console.log(req.user.role)
        if(!roles.includes(req.user.role)){
          console.log(req.user.role)
          return res.status(403).json({
            success: false,
            msg: `You have the ${req.user.role} priviledge which has no access to this page. Please consult administrator`
          })
        }
        next();
    }

}
