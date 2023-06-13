import style from "../../../styles/CreateTs.module.css";
import {Box} from "@mui/material";
import FormNv from "../../../components/form/formNv";
import * as axios from "../../../utils/response";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {useRouter} from "next/router";
import {createNhanVienApi} from "../../../servicesApi/nhanvien";

function Create(){
    const router = useRouter()
    const handleCreate = async (resForm) =>{
        try {
            const NhanVienReq = {
                "idNv": resForm.idNv[0],
                "hoten": resForm.nameNv[0],
                "cmnd": resForm.cmndNv[0],
                "email": resForm.emailNv[0],
                "sdt": resForm.sdtNv[0]
            }
            const res = await createNhanVienApi(NhanVienReq)
            if(res.success == false){
                const setMessage = resForm.idNv[1];
                setMessage({invalid:true ,message: res.message})
            }else{
                router.push("/nhanvien")
            }
        }catch (e){
            console.log(e)
        }
    }
    return <Box component="form"
                className={style.form_create}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
    >
        <h2 className={style.title}>Tạo tài sản</h2>
        <FormNv onSubmit={handleCreate}></FormNv>
    </Box>
}

export default Create