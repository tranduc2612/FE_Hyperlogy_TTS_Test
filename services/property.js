import {Delete, Get, Patch, Post} from "../utils/response";

export async function getPropertiesApi(page, size, searchName){
    const res = await Post(`/Property`,{
        page,size,searchName
    })
    return res.data
}

export async function deletePropertyApi(id){
    const res = await Delete(`/Property/${id}`);
    return res
}

export async function createPropertyApi(payload){
    const res = Post("/Property/Add", payload);
    return res
}

export async function updatePropertyApi(payload){
    const res = Patch("/Property", payload);
    return res
}


export async function getPropertyApi(idTs){
    const res = await Get(`/Property/${idTs}`);
    return {
        data: res.data,
        message: res.message,
        success: res.success
    }
}



