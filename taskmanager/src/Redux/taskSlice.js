import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serverURL from "../Services/url";
import axios, { Axios } from "axios";
// api call for fetch all data 
 export const fetchAllTask = createAsyncThunk(`alltask/fetchAllTask`,async()=>{
    const response = await axios.get(`${serverURL}/taskmanager`)
    return response.data
})
//api call to delete a task
export const deleteTask = createAsyncThunk('alltask/deleteTask',async(taskId)=>{
    const response = await axios.delete(`${serverURL}/deletetask/${taskId}`)
    return response.data
})
//api call to edit an data
export const editTask = createAsyncThunk('alltask/editTask',async({taskId,updatedTask})=>{
const response = await axios.put(`${serverURL}/edittask/${taskId}`,updatedTask)
})
const taskSlice = createSlice({
    name:'alltask',
    initialState:{
        tasks:[],
        taskcontainer:[],
        loading:false,
        error:''
    },
    reducers:{
     taskSearch:(state,action)=>{
        state.tasks=state.taskcontainer.filter(tasks=>tasks.task.toLowerCase().includes(action.payload))
     }
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchAllTask.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchAllTask.fulfilled,(state,action)=>{
            state.loading = false;
            state.tasks = action.payload
            state.taskcontainer=state.tasks
        })
        builder.addCase(fetchAllTask.rejected,(state)=>{
            state.loading = false
            state.tasks = []
            state.error = "error 404 , (server error)"
        })
        builder.addCase(deleteTask.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(deleteTask.fulfilled,(state,action)=>{
            state.loading= false
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        })
        builder.addCase(deleteTask.rejected,(state)=>{
            state.loading = false;
            state.error = "404 erroer on deleting "
        })
        builder.addCase(editTask.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(editTask.fulfilled,(state,action)=>{
            state.loading =  false
            
     })
     builder.addCase(editTask.rejected,(state)=>{
        state.loading=false;
        state.error="error 404"
     })
    }
})
export const {taskSearch}=taskSlice.actions
export default taskSlice.reducer