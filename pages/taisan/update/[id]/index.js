import {Box} from "@mui/material";
import style from "../../../../styles/UpdateTs.module.css"
import FormTs from "../../../../components/form/formTs";
import {useEffect, useLayoutEffect, useState} from "react";
import {useRouter} from "next/router";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {getTaiSanApi, updateTaiSanApi} from "../../../../servicesApi/taisan";

export default function UpdateTaiSan(){
    const router = useRouter()
    const [tsUpdate,setTsUpdate] = useState(null);
    const handleUpdate = async (action)=>{
        try{
            const TaiSanReq = {
                "id": action.actionId[0],
                "tentaisan": action.actionName[0],
                "sl": action.actionSl[0] == ""? 0 : Number(action.actionSl[0])
            }
            const res = await updateTaiSanApi(TaiSanReq);
            if(res.success == false){
                action.actionId[1]({invalid: true,message:res.message})
            }else{
                router.push("/taisan")
            }
        }catch (e){
            console.log(e)
        }
    }
    useEffect(()=>{
        let {id} = router.query;
        if(!id) return;
        const fetchApi = async ()=>{
            const res = await getTaiSanApi(id);
            if(res.data != null){
                setTsUpdate(res.data)
            }else{
                router.push("/notfound");
            }
        }
        fetchApi();
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