import {Delete, Get} from "../utils/response";

export async function getListTaiSanApi(page, size, name){
    const res = await Get(`/taiSan?page=${page}&size=${size}&nameTs=${name}`)
    return {
        listTaiSan: res.data.list,
        pageLength: res.data.length
    }
}

export async function deleteTaiSanApi(idTs){
    const res = await Delete(`/TaiSan/${idTs}`);
    return {
        data: res.data,
        message: res.message,
        success: res.success
    }
}

export async function getTaiSanApi(idTs){
    const res = await Get(`/TaiSan/${idTs}`);
    return {
        data: res.data,
        message: res.message,
        success: res.success
    }
}



