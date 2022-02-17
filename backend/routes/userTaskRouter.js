const router = require('express').Router()
const taskSaveModel = require('../models/userTaskModel')


router.get('/load/:UserId', async (req, res) => {
    console.log(req.params)
    const data = await taskSaveModel.find({UserId: req.params.UserId})
    return res.status(200).json({'message': 'complete', 'result': data})
})

router.post('/save', async (req, res) => {
    const taskSave = new taskSaveModel({UserId: req.body.UserId, TaskType: req.body.TaskType, TaskData: req.body.TaskData})
    await taskSave.save()
    return res.status(200).json({'message': 'complete'})
})


module.exports = router