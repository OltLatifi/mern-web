const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// @desc Register user
// @route POST /api/users/
// @access public

const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password} = req.body
  if(!name || !email || !password ||!password) {
    res.status(400)
    throw new Error("Please add all fields")
  }
  // check if user exists
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user){
    // if user is created it returns some json with their info
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else{
    res.status(400)
    throw new Error("Invalid user data")
  }
  res.json({message: "register user"})
})
// @desc Authenticate user
// @route POST /api/login/
// @access public

const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  // Check the user email
  const user = await User.findOne({email})
  // password from the body and the password on the database
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  }else{
    res.status(400)
    throw new Error("Invalid credentials")
  }
})
// @desc Get user data
// @route POST /api/user/
// @access private

const getMe = asyncHandler(async(req, res) => {
  const{_id, name, email, password} = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  })
})


// Genreate JWT
const generateToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

module.exports = {registerUser, loginUser, getMe,}