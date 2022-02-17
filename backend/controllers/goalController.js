const asyncHandler = require('express-async-handler');

const goal = require('../models/goalModel');
const user = require('../models/userModel');

// @desc Get goals
// @route GET /api/goals
// @access private

const getGoals = asyncHandler(async(req, res) => {
  const goals = await goal.find({user: req.user});
  res.status(200).json(goals);
})

// @desc Make goals
// @route POST /api/goals
// @access private

const setGoals = asyncHandler(async(req, res) => {
  if(!req.body.text){
    res.status(404)
    throw new Error('Please add some text')
  }
  const goal_ = await goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(goal_);
})

// @desc Update goals
// @route PUT /api/goals
// @access private

const updateGoal = asyncHandler(async(req, res) => {
  const goal_ = await goal.findById(req.params.id);
  if(!goal_){
    res.status(400);
    throw new Error("Goal not found")
  }
  const user_ = await user.findById(req.user.id);
  // check for user
  if(!user_){
    res.status(401)
    throw new Error("User not found")
  }
  // if the authenticated user is not the author
  if(goal_.user.toString() !== user_.id){
    res.status(401)
    throw new Error("User not authorized")
  }
  const updatedGoal = await goal.findOneAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedGoal);
})

// @desc Delete goal
// @route DELETE /api/goals
// @access private


const deteleGoal = asyncHandler(async(req, res) => {
  const goal_ = await goal.findById(req.params.id);
  if(!goal_){
    res.status(400);
    throw new Error("Goal not found")
  }
  const user_ = await user.findById(req.user.id);
  // check for user
  if(!user_){
    res.status(401)
    throw new Error("User not found")
  }
  // if the authenticated user is not the author
  if(goal_.user.toString() !== user_.id){
    res.status(401)
    throw new Error("User not authorized")
  }

  await goal_.remove()
  res.status(200).json({id:req.params.id});
})

module.exports = {getGoals, setGoals, updateGoal, deteleGoal}