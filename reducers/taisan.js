import {ADD_TAISAN, DELETE_TAISAN, GET_DETAIL_TAISAN, GET_LIST_TAISAN} from "../actions/constants";


export const initState = {
    list: [],
    pageLength: 0,
    detail: {},
    input: {}
}

function TaiSanReducer(state,action){
    switch (action.type){
        case GET_LIST_TAISAN:
            return {
                list: action.payload.listTaiSan,
                pageLength: action.payload.pageLength
            }
        case GET_DETAIL_TAISAN:
            return
        case ADD_TAISAN:
            return;
        case DELETE_TAISAN:
            const newList = state.list.filter(e=>e.id != action.payload);
            return {
                ...state,
                pageLength: newList.length == 0 ? state.pageLength - 1 : state.pageLength,
                list: newList,
            };
        default:
            return;
    }
}

export default TaiSanReducer