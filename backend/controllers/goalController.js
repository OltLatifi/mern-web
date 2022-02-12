const asyncHandler = require('express-async-handler');

// @desc Get goals
// @route GET /api/goals
// @access private

const getGoals = asyncHandler(async(req, res) => {
  res.status(200).json({message: 'Get Goals'});
})

// @desc Make goals
// @route POST /api/goals
// @access private

const setGoals = asyncHandler(async(req, res) => {
  if(!req.body.text){
    res.status(404)
    throw new Error('Please add some text')
  }
  res.status(200).json({message: 'Set Goal'});
})

// @desc Update goals
// @route PUT /api/goals
// @access private

const updateGoal = asyncHandler(async(req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}`});
})

// @desc Delete goal
// @route DELETE /api/goals
// @access private


const deteleGoal = asyncHandler(async(req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}`});
})

module.exports = {getGoals, setGoals, updateGoal, deteleGoal}