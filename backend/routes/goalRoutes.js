const express = require('express');
const router = express.Router();
const {getGoals, setGoals, updateGoal, deteleGoal} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoal).delete(deteleGoal)

module.exports = router;