const express = require('express');
const router = express.Router();
const {getGoals, setGoals, updateGoal, deteleGoal} = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware') 


router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').put(protect, updateGoal).delete(protect, deteleGoal)

module.exports = router;