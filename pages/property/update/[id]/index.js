import {Box} from "@mui/material";
import style from "../../../../styles/UpdateTs.module.css"
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import { getPropertyApi, updatePropertyApi} from "../../../../services/property";
import Form from "../../../../components/form/form";
import {AMOUNT_PROPERTY, ID_PROPERTY, NAME_PROPERTY} from "../../../../helper/validateForm";

const VALIDATE_PROPERTIES = [
    {
        field_name: ID_PROPERTY,
        val: ["required", "format_ts", "max_length;10"],
    },
    {
        field_name: NAME_PROPERTY,
        val: ["required", "max_length;40", "not_special_character"],
    },
    {
        field_name: AMOUNT_PROPERTY,
        val: ["required", "number_upper0"],
    },
];

const FIELD_PROPERTIES = [
    {
        field_name: ID_PROPERTY,
        place_holder: "TS + mã số",
        label: "Mã tài sản",
        init_value: ""
    },
    {
        field_name: NAME_PROPERTY,
        place_holder: "Nhập tên tài sản",
        label: "Tên tài sản",
        init_value: ""
    },
    {
        field_name: AMOUNT_PROPERTY,
        place_holder: "Nhập số lượng",
        label: "Số lượng",
        init_value: ""
    },
];


export default function UpdateTaiSan(){
    const router = useRouter();
    const formRef = useRef();
    const [initFields,setInitFields] = useState(null);

    const handleUpdate = async ()=>{
        const req = {}
        const value = formRef.current.getValue();
        const setValue = formRef.current.setValue;
        value.forEach(e=> {
            if(e.fieldName == ID_PROPERTY){
                req.idProperty = e.value
            }
            if(e.fieldName == NAME_PROPERTY){
                req.nameProperty = e.value
            }
            if(e.fieldName == AMOUNT_PROPERTY){
                req.amount = +e.value
            }
        })

        try{
            const res = await updatePropertyApi(req);
            if(res.success){
                router.push("/property")
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

    useEffect(()=>{
        let {id} = router.query;
        if(!id){
            return;
        }
        const fetchApi = async ()=>{
            const res = await getPropertyApi(id);
            if(res.data != null){
                const {idProperty, nameProperty, amount} = res.data[0].property;
                const newFields = [...FIELD_PROPERTIES].map(e=>{
                    if(e.field_name == ID_PROPERTY){
                        return {
                            ...e,
                            init_value: idProperty
                        }
                    }
                    if(e.field_name == NAME_PROPERTY){
                        return {
                            ...e,
                            init_value: nameProperty
                        }
                    }
                    if(e.field_name == AMOUNT_PROPERTY){
                        return {
                            ...e,
                            init_value: amount
                        }
                    }
                });
                setInitFields(newFields);
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
        {initFields &&  <Form ref={formRef} fields={initFields} valids={VALIDATE_PROPERTIES} onSubmit={handleUpdate} titleForm={"Cập nhật tài sản"} />}
    </Box>
}