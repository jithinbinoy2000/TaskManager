import React, { useState } from 'react'
import { Modal,Button,Form, Toast, ToastBody, ToastContainer} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, fetchAllTask } from '../../Redux/taskSlice';

function Edittask(props) {
    const [showEdit, setShowEdit] = useState(false);
    const[editTaskName,setEditTaskName] = useState("")
    const[editDescription,setEditDescription] = useState("")
    //modal
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    //toast
  const [showA, setShowA] = useState(false); //state for toast
  const [message,setMessage]= useState({res:"",message:""})  // messages-success or fail
  const toggleShowA = () => setShowA(!showA);
    const dispatch = useDispatch();
    const id = props.task.id
    const validateInput=(e)=>{
 const {name,value}=e.target
if(name==='edittaskname'){
    setEditTaskName(value)
}else if(name==='editdescription'){
    setEditDescription(value)
}
    }
    const handleSave=()=>{
        const updatedTask = {
            task:editTaskName,
            description:editDescription
        }
       dispatch(editTask({taskId:props.task._id,updatedTask})).then(()=>{
        dispatch(fetchAllTask());
        setMessage({res:"Edited",message:"Your task is Successfully Edited"})
        toggleShowA()
        handleCloseEdit()
       }).catch((error)=>{
        setMessage({res:"Error",message:error})
       })
    }
    const handleCancelled =()=>{
      setMessage({res:"Cancelled",message:"Edit Task is cancelled"}),
      handleCloseEdit()
      toggleShowA()
    }

  return (
    
    
    <>
    <div className='btn btn-sm btn-warning' onClick={handleShowEdit}><i className="fa-regular fa-pen-to-square "></i></div>
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name <span className='text-danger'>*</span></Form.Label>
              <Form.Control
              className='textarea'
                type="Text"
                placeholder="Enter your Task"
                autoFocus
                name='edittaskname'
                value={editTaskName||props.task.task}
             onChange={(e)=>validateInput(e)} />
              {editTaskName.length===0&&<div className='fs-6 fw-lighter text-warning'>* This field is Required</div>}

            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control as="textarea" rows={3}
              name='editdescription'
              value={editDescription||props.task.description}
            onChange={(e)=>validateInput(e)}/>
            </Form.Group>
          </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelled} className='btn-danger'>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave} className='btn-success' disabled={editTaskName.length===0}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* toast meassage when deleted */}
      <ToastContainer position='bottom-end'>
        <Toast show={showA} onClose={toggleShowA} animation autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{message.res}</strong>
              <small>now</small>
            </Toast.Header>
            <Toast.Body>{message.message}</Toast.Body>
          </Toast>
     </ToastContainer>
    </>
  )
}

export default Edittask