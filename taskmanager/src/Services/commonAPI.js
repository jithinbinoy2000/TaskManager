import axios from "axios";

 export const commonAPI= async(httpmethod,url,requestBody)=>{
    let reqConfig = {
        method:httpmethod,
        url,
        headers:{
            "Content-Type":"application/json"
        },
        data:requestBody
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}