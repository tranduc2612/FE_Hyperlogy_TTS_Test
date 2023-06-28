import {useState,useEffect} from "react";

function useDebounce (value,delay = 500){
    const [debounceValue,setDebounceValue] = useState()

    useEffect(()=>{
        const id = setTimeout(()=>{
            setDebounceValue(value)
        },delay)

        return ()=>{
            clearTimeout(id)
        }
    },[value])

    return debounceValue
}

export default useDebounce