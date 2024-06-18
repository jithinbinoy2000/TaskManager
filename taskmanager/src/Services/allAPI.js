import { commonAPI } from "./commonAPI";
import serverURL from "./url";

export const addNewTaskAPI = async(newTask)=>{
    return await commonAPI("POST",`${serverURL}/addnewtask`,newTask)
}
export const getAllTaskAPI= async()=>{
    return await commonAPI("GET",`${serverURL}/taskmanager`)
}