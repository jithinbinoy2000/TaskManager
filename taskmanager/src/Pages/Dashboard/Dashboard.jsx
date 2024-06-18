import React, { useEffect, useState} from 'react'
import { Table ,Modal,Button, Spinner, ToastContainer, Toast, ToastBody, ToastHeader} from 'react-bootstrap'
import AddNewTask from '../addNewTask/AddNewTask';
import Edittask from '../editText/Edittask';
import './dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import taskSlice, { deleteTask, fetchAllTask, taskSearch } from '../../Redux/taskSlice';
function Dashboard() {
  const dispatch = useDispatch();
  const {loading,tasks,error}=useSelector((state)=>state.taskSlice)
  useEffect(()=>{
    dispatch(fetchAllTask())

  },[dispatch])
  const [showView, setShowView] = useState(false);// state for Show modal View
  const [showDelete, setShowDelete] = useState(false);// state for Delete modal
  const [seletedTask,setSeletedTask]=useState(null); //state for selected task
  const handleCloseView = () => setShowView(false); //modal
  const [addDescription,setAddDescription] = useState(''); //state for descritption
  const [showA, setShowA] = useState(false); //state for toast
  const [message,setMessage]= useState({res:"",message:""})  // messages-success or fail
  const toggleShowA = () => setShowA(!showA);
  //view task one by one
  const handleShowView = (task) => {
    setSeletedTask(task);
    setShowView(true);}
//function to show modal to delete
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (task) => {
    setSeletedTask(task)
    setShowDelete(true);}
    //func for delete
  const handleDelete =() =>{
    dispatch(deleteTask(seletedTask._id)).then(()=>{ //dispatch for api call
      handleCloseDelete();
      setMessage({res:"Deleted",message:"Your Task is Successfully Deleted"})
      toggleShowA();
      dispatch(fetchAllTask());
    }).catch((err)=>{
      alert(err);
      handleCloseDelete();
      setMessage({res:"Server erroe",message:err})
    })
  }
  const handleCancelled =()=>{
    setMessage({res:"Cancelled",message:"Delete Task is cancelled"}),
    handleCloseDelete();
    toggleShowA()
  }

  return (
    <>
    <div>
      <h4 className='text-center p-1 fw-bolder fs-2'>Task Manager</h4>
      <div className='search p-1'>
        <form className='row g-3'><input type="text" className='form-control border rounded col-auto textarea' placeholder='Search Task' onChange={(e)=>dispatch(taskSearch(e.target.value.toLowerCase()))}/></form>
        <AddNewTask/>
      </div>
    </div>
    {/* table----- */}
    <div className='p-1 border-rounded'>
      {loading?<div className='text-center mt-5'><Spinner animation="border" variant="light" /></div>:
       <Table striped={true} hover borderless={false}>
       <thead>
         <tr className='text-start'>
           <th>#</th>
           <th>Task</th>
           <th className='description'>Description</th>
           <th>Action</th>
           
         </tr>
       </thead>
      {tasks.length>0?tasks.length>0&& tasks.map((task,index)=>(
        <tbody key={task.id}  className='tablebody' >
         <tr className='maintable'>
           <td>{index+1}</td>
           <td>{task.task}</td>
           <td className='description'>{task.description.length>0?`${task.description.length>41?task.description.slice(0,40)+"...":task.description}`:"(empty)"}</td>
           <td className='controls'>
             <div className='d-flex justify-content-evenly align-items-center'>
               {/* controls for view-edit-delete */}
            <Button className='btn btn-sm btn-success me-1'  onClick={()=>handleShowView(task)}><i className="fa-regular fa-eye"></i></Button> 
            {/* editing component */}
             <Edittask task={task}/>
             {/* deleting component */}
             <div className='btn btn-sm btn-danger ms-1' onClick={()=>handleShowDelete(task)}><i className="fa-solid fa-trash"></i></div>
             </div>
           </td> 
         </tr>
       </tbody>)):<div className='text-center fw-solid  text-warning fw-bolder mt-2 d-flex justify-content-evenly'>No Task Found</div>}
     </Table>}
    </div>
   
     {/* modal  for view task*/}
     <Modal show={showView} onHide={handleCloseView} >
        <Modal.Header closeButton>
          <Modal.Title><div className='text-warning'>Task  </div>{seletedTask&&seletedTask.task}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div className='text-warning'>Description  </div>{seletedTask&&seletedTask.description?seletedTask.description:"empty"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView} className='btn-danger'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    {/* modal for delete warning */}
    <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title className='text-warning'> <i className="fa-solid fa-triangle-exclamation"></i> Warning !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-danger fw-bold text-wrap fs-6'>Are you sure you Want to Delete this Task ?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCancelled}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i> Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* toast for when deleted */}
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

export default Dashboard