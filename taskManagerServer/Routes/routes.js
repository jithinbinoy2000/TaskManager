const controller = require('../Controller/controller')
const express = require('express')
const router = express.Router()
//Add task
router.post('/addnewtask',controller.add_new_task)
//fetch all task
router.get('/taskmanager',controller.fetch_all_task)
//edit task
router.put('/edittask/:id',controller.edit_task)
//delete task 
router.delete('/deletetask/:id',controller.delete_task)
module.exports=router
