import {Get, Post} from "../utils/response";

export async function getListStaffApi(page, size, name){
    const res = await Post(`/Staff?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}&nameNv=${encodeURIComponent(name)}`)
    return res.data
}

export async function assignPropertyForStaffApi(idNv, idTs){
    const res = await Post(`/Staff/AssignProperty?idNv=${encodeURIComponent(idNv)}&idTs=${encodeURIComponent(idTs)}`)
    return res
}

export async function createStaffApi(payload){
    const res = await Post(`/Staff/Add`,payload)
    return res
}