const router = require('express').Router()
const taskSaveModel = require('../models/userTaskModel')

router.get('/load/:UserId', async (req, res) => {
    const data = await taskSaveModel.find({UserId: req.params.UserId})
    let toData = []
    data.map((d) => { toData.push([d.UserId, d.TaskType, d.TaskTitle, d.contentNumber]) })
    return res.status(200).json({'message': 'complete', 'result': toData})
})

router.post('/save', async (req, res) => {
    const taskSave = new taskSaveModel({UserId: req.body.UserId, TaskType: req.body.TaskType, TaskTitle: req.body.TaskTitle})
    await taskSave.save()
    return res.status(200).json({'message': 'complete'})
})

router.delete('/delete/:contentNumber', async (req, res) => {
    await taskSaveModel.deleteOne({contentNumber: req.params.contentNumber})
    return res.status(200).json({'message': 'complete', 'contentNumber': req.params.contentNumber})
})

module.exports = router