import React, { useState } from 'react'
import { Button, Modal,Form,Toast, ToastContainer} from 'react-bootstrap'
import './addNewTask.css'
import { addNewTaskAPI, getAllTaskAPI } from '../../Services/allAPI';
import { useDispatch } from 'react-redux';
import { fetchAllTask } from '../../Redux/taskSlice';


function AddNewTask() {
    const [showAdd, setShowAdd] = useState(false); //state for modal
    const [addNewTask,setAddNewTask] = useState(""); //state for newtask name
    const [addDescription,setAddDescription] = useState(''); //state for descritption
    const [showA, setShowA] = useState(false); //state for toast
    const [message,setMessage]= useState("Success")  // messages-success or fail
    const toggleShowA = () => setShowA(!showA);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const dispatch = useDispatch()
    const validateInput=(e)=>{
       
const {name,value}=e.target //name and value of input field
if(name==='taskName'){
    setAddNewTask(value) //assign
}else if(name==='description'){
    setAddDescription(value) //assign
}
    }
    //api call for add new task
    const handleUpload =async()=>{
    const newTask ={
    task:addNewTask,
    description:addDescription
}
const result = addNewTaskAPI(newTask).then(()=>{
    handleCloseAdd(); //close modal
    setAddNewTask("");
    setAddDescription("");
    setMessage("sucess") //message- sucess
    toggleShowA();
    dispatch(fetchAllTask()); //fetch alltask api
}).catch((err)=>{
  setMessage(err) //message err
    alert(err)
    
})
    }
  return (
    <div>
        <div className="btn btn-success btn-sm" onClick={handleShowAdd}>Add new Task</div>
        <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Task</Modal.Title>
        </Modal.Header>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name <span className='text-danger'>*</span></Form.Label>
              <Form.Control
              className='textarea'
                type="Text"
                placeholder="Enter your Task"
                autoFocus
                name='taskName'
                value={addNewTask||""}
                onChange={(e)=>{validateInput(e)}}
              />
               {addNewTask.length===0&&<div className='fs-6 fw-lighter text-warning'>* This field is Required</div>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control as="textarea" rows={3}
              type='text'
              name='description'
              value={addDescription||""} 
              onChange={(e)=>{validateInput(e)}}/>
            </Form.Group>
          </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd} className='btn-danger'>
            Close
          </Button>
          <Button variant="secondary" onClick={()=>{handleCloseAdd,handleUpload()}} className='btn-success' disabled={addNewTask.length===0}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* toast message when for add task action */}
     <ToastContainer position='bottom-end'>
        <Toast show={showA} onClose={toggleShowA} animation autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{message}</strong>
              <small>now</small>
            </Toast.Header>
            <Toast.Body>New Task is Added</Toast.Body>
          </Toast>
     </ToastContainer>
    
    </div>
  )
}

export default AddNewTask