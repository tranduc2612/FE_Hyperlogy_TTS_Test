import {Delete, Get, Patch, Post} from "../utils/response";

export async function getListTaiSanApi(page, size, name){
    const res = await Get(`/taiSan?page=${page}&size=${size}&nameTs=${name}`)
    return res.data
}

export async function deleteTaiSanApi(idTs){
    const res = await Delete(`/TaiSan/${idTs}`);
    return {
        data: res.data,
        message: res.message,
        success: res.success
    }
}

export async function createTaiSanApi(payload){
    const res = Post("/TaiSan", payload);
    return res
}

export async function updateTaiSanApi(payload){
    const res = Patch("/TaiSan", payload);
    return res
}


export async function getTaiSanApi(idTs){
    const res = await Get(`/TaiSan/${idTs}`);
    return {
        data: res.data,
        message: res.message,
        success: res.success
    }
}



