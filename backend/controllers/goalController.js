const asyncHandler = require('express-async-handler');
const goal = require('../models/goalModel');

// @desc Get goals
// @route GET /api/goals
// @access private

const getGoals = asyncHandler(async(req, res) => {
  const goals = await goal.find();
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
  })
  res.status(200).json(goal_);
})

// @desc Update goals
// @route PUT /api/goals
// @access private

const updateGoal = asyncHandler(async(req, res) => {
  const goal_ = await goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error("Goal not found")
  }
  const updatedGoal = await goal.findOneAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedGoal);
})

// @desc Delete goal
// @route DELETE /api/goals
// @access private


const deteleGoal = asyncHandler(async(req, res) => {
  const goal_ = await goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error("Goal not found")
  }
  await goal_.remove()
  res.status(200).json({id:req.params.id});
})

module.exports = {getGoals, setGoals, updateGoal, deteleGoal}