import { GET_FILES_FAIL, GET_FILES_REQUEST, GET_FILES_SUCCESS, UPLOAD_FILE_FAIL, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS } from "../constants/fileConstants";

import axios from "axios";


//All uploaded file details by the user
export const getUploadedFiles=(currentPage=1,keyword="")=>async (dispatch)=>{
    try{
        dispatch({type:GET_FILES_REQUEST})
        
   console.log(currentPage)
        const {data}=await axios.get(`https://blockation-cfhb.onrender.com/auth/me/uploadedfiles?page=${currentPage}&keyword=${keyword}`);

console.log(data)
        if(data.success===true){
        dispatch({type:GET_FILES_SUCCESS,payload:data.uploadedFiles,fileCount:data.fileCount,resultPerPage:data.resultPerPage})
        }
        else{
            dispatch({type:GET_FILES_SUCCESS,payload:"You need to add the data"})
        }
    }catch(error){
        dispatch({type:GET_FILES_FAIL,payload:error.response.data.message})
    }
}

//Upload Files 

export const uploadFiles=({file,cid,isCert})=>async (dispatch)=>{
    try{
        dispatch({type:UPLOAD_FILE_REQUEST})
        // const formData = new FormData()
        // console.log(file,cid);
        // formData.append("file", file.toString());
        // formData.append("cid", cid.toString());
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cid", cid);
        formData.append("isCert",isCert)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        // const sessionToken = window.sessionStorage.getItem("user-session");
        // console.log(sessionToken);
        // const headers = new Headers()
        // headers.append('Authorization', `Bearer ${sessionToken}`);
        // headers.append("Content-Type", "multipart/form-data");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data" ,
                // Authorization: `Bearer ${sessionToken}` // Assuming Bearer token authentication
            }
        };
        
        const {data}=await axios.post(
            `https://blockation-cfhb.onrender.com/file/sendfile`,
            formData,
            cid,
            isCert,
            config
        )
        console.log(data)
        dispatch({type:UPLOAD_FILE_SUCCESS,payload:data})
        fetch('https://blockation-cfhb.onrender.com/file/getAllFiles')
        .then(response => response.json())
        .then(data => {
            window.location.href = data.redirectUrl;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }catch(error){
        console.log(error)
        dispatch({type:UPLOAD_FILE_FAIL,payload:error.response.data.message})
    }
}