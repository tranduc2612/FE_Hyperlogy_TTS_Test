import Context from "../store/context";
import {useContext} from "react";

export default function useStore(){
    const state = useContext(Context);
    return state;
}