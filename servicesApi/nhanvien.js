import {Get, Post} from "../utils/response";

export async function getListNhanVienApi(page, size, name){
    const res = await Get(`/NhanVien?page=${page}&size=${size}&nameNv=${name}`)
    return res.data
}

export async function ganTaiSanForNhanVienApi(idNv,idTs){
    const res = await Post(`/NhanVien/GanTaiSan?idNv=${idNv}&idTs=${idTs}`)
    return res
}

export async function createNhanVienApi(payload){
    const res = await Post(`/NhanVien`,payload)
    return res
}