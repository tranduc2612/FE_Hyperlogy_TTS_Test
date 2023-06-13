import {Box} from "@mui/material";
import style from "../../../../styles/UpdateTs.module.css"
import FormTs from "../../../../components/form/formTs";
import {useEffect, useLayoutEffect, useState} from "react";
import * as axios from "../../../../utils/response";
import {useRouter} from "next/router";
import {log} from "next/dist/server/typescript/utils";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

export default function UpdateTaiSan(){
    const router = useRouter()
    const [tsUpdate,setTsUpdate] = useState(null);
    const [idTs,setIdTs] = useState();

    const handleUpdate = (action)=>{
        const TaiSanReq = {
            "id": action.actionId[0],
            "tentaisan": action.actionName[0],
            "sl": action.actionSl[0] == ""? 0 : Number(action.actionSl[0])
        }
        axios.Patch(`/TaiSan`,TaiSanReq
        )
            .then((res)=>{
                if(res.success == false){
                    action.actionId[1]({invalid: true,message:res.message})
                }else{
                    router.push("/taisan")
                }
            })
            .catch((e)=>{
                console.log(e)
            })
    }


    useLayoutEffect(()=>{
        let {id} = router.query;
        if(!id) return;
        setIdTs(id);
        axios.Get(`/TaiSan/${id}`)
            .then((res)=>{
                const resData = res.data;
                if(resData != null){
                    setTsUpdate(resData)
                }else{
                    router.push("/notfound");
                }

            })
            .catch((e)=>{
                console.log(e)
            })
    },[router])


    return <Box component="form"
                className={style.update_form}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
    >
        <h1 style={{textAlign:"center"}}>Sửa tài sản</h1>
        {tsUpdate?<FormTs onSubmit={handleUpdate} id={router.query} data={tsUpdate} messageBtn="Sửa tài sản"></FormTs>:<></>}

    </Box>
}