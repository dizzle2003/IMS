const mongoose = require("mongoose");
const User = require("../models/User");


/*
@desc = login user
@route = '/api/user/login'
@access = private (All CU registered users)
*/

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //Valideate email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      err: "Please enter a valid email address and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      err: "User does not exist",
    });
  }
  //Match Password
  const isMatch = await user.matchPassword(password);
  // @ts-ignore
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      err: "Invalid Credentials",
    });
  }
  //Create  User Token to be used in login
  sendTokenResponse(res, 200, user);
};

//Create Token from Model, embed in cookie and respond to frontend
const sendTokenResponse = (res, statusCode, user) => {
  const token = user.getSignedJwtToken();

  const options = {
    // @ts-ignore
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if(process.env.NODE_ENV === 'production'){
      options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    // @ts-ignore
    .json({ login: "successful", token, user});
};

/*
@desc = Retrieves all users in the database
@route = '/api/users'
@access = private (admin only)
*/

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

/*
@desc = Logs User Out
@route = '/api/users'
@access = private (admin only)
*/

exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    data: {}
  })
};
