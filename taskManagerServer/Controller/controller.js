const { response } = require('express');
const taskmanger = require('../Model/taskmodel');
const tasks = require('../Model/taskmodel')
//add a new task------------ 
exports.add_new_task= async(request,response)=>{
    const {task,description}=request.body;
  try{  const existing_task= await taskmanger.findOne({task})
    if(existing_task){
        response.status(406).json(`'${task}' is already exist`)
    }else{

const new_task = new taskmanger({task,description});
await new_task.save();
response.status(200).json(`${new_task.task}, is added successfully to task`)
    }
}catch(error){
    response.status(500).json("Internal Server error !!",`${error}`)
}
}

//get all data---------------
exports.fetch_all_task = async(request,response)=>{
try{const tasks = await taskmanger.find();
    if(!tasks){
        response.json("Task is Empty")
    }else{
        response.status(200).json(tasks)
    }
}catch(error){
    response.json(error)
}
}

//edit task ----------
exports.edit_task=async(request,response)=>{
 const {task, description} = request.body;
const {id}=request.params //get _id
try{
    const updatedTaskDoc = await taskmanger.findByIdAndUpdate(
        id,
        { task,description},
        { new: true }
      );// save to model --- mongoose
    await updatedTaskDoc.save(); //update to mongoDB
    if(!updatedTaskDoc){
        return response.status(404).json("task not found")
    }
    response.status(200).json("Successfully Updated")
    
}catch(error){
response.status(500).json("error - internal server error")
}
}

//delete task -------
exports.delete_task = async(request,response)=>{
    const {id} = request.params;
     try {
         const delete_task= await taskmanger.findByIdAndDelete({_id:id})
     if(!delete_task){
        response.status(404).json('item not found , server error , please try again')
     }else{
        response.status(200).json("deleted")
     }
    }
    catch(error){
        response.json(error)
    }
}