const router = require('express').Router()
const userTaskModel = require('../models/userTaskModel')

router.get('/:userId', async (req, res) => {
    const data = await userTaskModel.find({user_id: req.params.userId})
    let toData = []
    data.map((d) => { toData.push([d.user_id, d.task_type, d.task_title, d.content_number]) })
    return res.status(200).json({'message': 'complete', 'result': toData})
})

router.post('/', async (req, res) => {
    const taskSave = new userTaskModel({user_id: req.body.user_id, task_type: req.body.task_type, task_title: req.body.task_title})
    await taskSave.save()
    return res.status(200).json({'message': 'complete'})
})

router.delete('/:contentNumber', async (req, res) => {
    await userTaskModel.deleteOne({content_number: req.params.contentNumber})
    return res.status(200).json({'message': 'complete', 'contentNumber': req.params.contentNumber})
})

module.exports = router