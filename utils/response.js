import axios from "axios";

const request = axios.create({
    baseURL: "https://localhost:7142/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});

export const Get = async (path,options={})=>{
    const response = await request.get(path,options);
    return response.data
}

export const Delete = async (path,options={})=>{
    const response = await request.delete(path,options);
    return response.data
}

export const Patch = async (path,options={})=>{
    const response = await request.patch(path,options);
    return response.data
}

export const Post = async (path,options={})=>{
    const response = await request.post(path,options);
    return response.data
}

export default request