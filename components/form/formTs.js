import {memo, useEffect, useRef, useState} from "react";
import {TextField} from "@mui/material";
import style from "../../styles/CreateTs.module.css";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import axios from "../../api/config";
import ValidateForm, {IDTS_FIELD, NAMETAISAN_FIELD, SL_FIELD} from "../../helper/validateForm";

const VALIDATE_TAISAN=[
    {
        field_name:IDTS_FIELD,
        val:["required","format_ts","max_length;10"]
    },
    {
        field_name:NAMETAISAN_FIELD,
        val:["required","max_length;40","not_special_character"]
    },{
        field_name:SL_FIELD,
        val:["required","number_upper0"]
    }
]



export default function FormTs({ onSubmit,id,data,messageBtn }){
    const idRef = useRef(data?data.id:"");
    const [infoValidId,setInfoValidId] = useState({invalid: false,message: ""});

    const nameRef = useRef(data?data.tentaiSan:"");
    const [infoValidName,setInfoValidName] = useState({invalid: false,message: ""})

    const slRef = useRef(data?data.sl:"");
    const [infoValidSl,setInfoValidSl] = useState({invalid: false,message: ""})

    useEffect(()=>{
        if(id){
            idRef.current = data.id
            nameRef.current = data.tentaiSan
            slRef.current = data.sl
        }
    },[data,id])

    // validate
    const handleSubmit = (e) =>{
        console.log("click")
        const infoValidateId = ValidateForm(VALIDATE_TAISAN,idRef.current,IDTS_FIELD);
        const infoValidateName = ValidateForm(VALIDATE_TAISAN,nameRef.current,NAMETAISAN_FIELD);
        const infoValidateSl = ValidateForm(VALIDATE_TAISAN,slRef.current,SL_FIELD);
        if(!infoValidateId.invalid && !infoValidateName.invalid && !infoValidateSl.invalid){
            // gui thanh cong
            console.log("gui thanh cong")
            const resForm = {
                actionId: [idRef.current,setInfoValidId],
                actionName: [nameRef.current,setInfoValidName],
                actionSl: [slRef.current,setInfoValidSl]
            }
            onSubmit(resForm);
        }else{
            setInfoValidId(infoValidateId)
            setInfoValidName(infoValidateName)
            setInfoValidSl(infoValidateSl)
        }
    }

    const handleEventId = (e) => {
        const idValue = e.target.value;
        idRef.current = idValue;
        setInfoValidId(ValidateForm(VALIDATE_TAISAN,idValue,IDTS_FIELD))
    }



    const handleEventName = (e) => {
        const nameValue = e.target.value;
        nameRef.current = nameValue;
        setInfoValidName(ValidateForm(VALIDATE_TAISAN,nameValue,NAMETAISAN_FIELD))
    }

    const handleEventAmount = (e) => {
        const mountValue = e.target.value;
        slRef.current = mountValue;
        setInfoValidSl(ValidateForm(VALIDATE_TAISAN,mountValue,SL_FIELD))
    }

    return <>
        <div>
            <TextField
                error={infoValidId.invalid}
                className={style.input_form}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Mã tài sản"
                onChange={handleEventId}
                value={idRef.current}
                placeholder={"TS + mã số"}
            />
            <span className={`danger ${infoValidId.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidId.message}</span>

            <TextField
                error={infoValidName.invalid}
                className={style.input_form}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Tên tài sản"
                placeholder={"Nhập tên tài sản"}
                value={nameRef.current}
                onChange={handleEventName}
            />
            <span className={`danger ${infoValidName.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidName.message}</span>


            <TextField
                error={infoValidSl.invalid}
                className={style.input_form}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Số lượng"
                placeholder={"Nhập số lượng"}
                value={slRef.current}
                onChange={handleEventAmount}
            />
            <span className={`danger ${infoValidSl.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidSl.message}</span>

            <div className="wrap" style={{marginTop: "40px"}}>
                <Button style={{margin: "10px auto"}} variant="contained" onClick={handleSubmit}>{messageBtn}</Button>
            </div>


        </div>
    </>
}