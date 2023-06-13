import {useReducer} from "react";
import Context from "./context";
import TaiSanReducer,{initState} from "../reducers/taisan";

function Provider({children}){
    const [state,dispatch] = useReducer(TaiSanReducer,initState);
    const storage = {
        taiSan: [state,dispatch]
    }
    return <Context.Provider value={storage}    >
        {children}
    </Context.Provider>
}

export default Provider