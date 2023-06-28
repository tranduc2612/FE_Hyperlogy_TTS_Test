import style from "../../../styles/CreateTs.module.css";
import {Box} from "@mui/material";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {useRouter} from "next/router";
import {createStaffApi} from "../../../services/staff";
import {
    EMAIL_STAFF,
    ID_STAFF,
    IDENTIFY_STAFF,
    NAME_STAFF,
    PHONE_STAFF
} from "../../../helper/validateForm";
import Form from "../../../components/form/form";
import {useRef} from "react";

const VALIDATE_STAFF=[
    {
        field_name:ID_STAFF,
        val:["required","format_nv","max_length;10"],
    },
    {
        field_name:NAME_STAFF,
        val:["required"],
    },{
        field_name:EMAIL_STAFF,
        val:["required","format_email"],
    },{
        field_name:IDENTIFY_STAFF,
        val:["required","format_cmnd"],
    },{
        field_name:PHONE_STAFF,
        val:["required"],
    }
]

const FIELD_PROPERTIES = [
    {
        field_name: ID_STAFF,
        place_holder: "NV + mã số",
        label: "Mã nhân viên",
        init_value: ""
    },
    {
        field_name: NAME_STAFF,
        place_holder: "Nhập tên nhân viên",
        label: "Tên nhân viên",
        init_value: ""
    },
    {
        field_name: EMAIL_STAFF,
        place_holder: "Nhập email nhân viên",
        label: "Email",
        init_value: ""
    },
    {
        field_name: IDENTIFY_STAFF,
        place_holder: "Nhập CMND nhân viên",
        label: "CMND",
        init_value: ""
    },
    {
        field_name: PHONE_STAFF,
        place_holder: "Nhập số điện thoại nhân viên",
        label: "Điện thoại",
        init_value: ""
    },
];

function Create(){
    const router = useRouter()
    const formRef = useRef()

    const handleCreate = async () =>{
        try {
            const req = {}
            const value = formRef.current.getValue();
            const setValue = formRef.current.setValue;
            value.forEach(e=> {
                if(e.fieldName == ID_STAFF){
                    req.idStaff = e.value
                }
                if(e.fieldName == NAME_STAFF){
                    req.fullName = e.value
                }
                if(e.fieldName == IDENTIFY_STAFF){
                    req.citizenIdentification = e.value
                }
                if(e.fieldName == EMAIL_STAFF){
                    req.email = e.value
                }
                if(e.fieldName == PHONE_STAFF){
                    req.phoneNumber = e.value
                }
            })
            const res = await createStaffApi(req)
            if(res.success){
                router.push("/staff")
            }else{
                const newValue = value.map(e=>{
                    if(res.typeRes == e.fieldName){
                        return {
                            ...e,
                            invalid: true,
                            message: res.message
                        }
                    }
                    return e
                })
                setValue(newValue)
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
        <Form ref={formRef} fields={FIELD_PROPERTIES} valids={VALIDATE_STAFF} onSubmit={handleCreate} titleForm={"Tạo nhân viên"} />

    </Box>
}

export default Create