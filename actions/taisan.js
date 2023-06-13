import {DELETE_TAISAN, GET_DETAIL_TAISAN, GET_LIST_TAISAN} from "./constants";

export function getList(payload){
    return{
        type: GET_LIST_TAISAN,
        payload
    }
}

export function deleteTaiSan(payload){
    return{
        type: DELETE_TAISAN,
        payload
    }
}

export function getTaiSan(payload){
    return{
        type: GET_DETAIL_TAISAN,
        payload
    }
}