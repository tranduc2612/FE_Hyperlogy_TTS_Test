import { DELETE_TAISAN, GAN_TAISAN, GET_DETAIL_TAISAN, GET_LIST_TAISAN} from "../actions/constants";


export const initState = {
    list: [],
    pageLength: 0,
    currentPage: 1,
    detail: {},
    input: {}
}

function TaiSanReducer(state,action){
    switch (action.type){
        case GET_LIST_TAISAN:
            return {...state,
                list: action.payload.list,
                pageLength: action.payload.length,
                currentPage: action.payload.currentPage
            }
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