import {TextField} from "@mui/material";
import style from "../../styles/CreateTs.module.css";
import Button from "@mui/material/Button";
import {useRef, useState} from "react";
import ValidateForm, {CMND_FIELD, EMAIL_FIELD, IDNV_FIELD, NAMENV_FIELD, SDT_FIELD} from "../../helper/validateForm";

const VALIDATE_NV=[
    {
        field_name:IDNV_FIELD,
        val:["required","format_nv","max_length;10"]
    },
    {
        field_name:NAMENV_FIELD,
        val:["required"]
    },{
        field_name:EMAIL_FIELD,
        val:["required","format_email"]
    },{
        field_name:CMND_FIELD,
        val:["required","format_cmnd"]
    },{
        field_name:SDT_FIELD,
        val:["required"]
    }
]



export default function FormNv({ onSubmit }){
    const idNv = useRef();
    const [infoValidId,setInfoValidId] = useState({invalid:false,message:""});

    const nameNv = useRef();
    const [infoValidName,setInfoValidName] = useState({invalid:false,message:""})

    const emailNv = useRef();
    const [infoValidEmail,setInfoValidEmail] = useState({invalid:false,message:""})

    const cmndNv = useRef();
    const [infoValidCmnd,setInfoValidCmnd] = useState({invalid:false,message:""})

    const sdtNv = useRef();
    const [infoValidSdt,setInfoValidSdt] = useState({invalid:false,message:""})



    const handleSubmit = (e)=>{

        const isIdValid = ValidateForm(VALIDATE_NV,idNv.current.value,IDNV_FIELD).invalid;
        const isNameValid = ValidateForm(VALIDATE_NV,nameNv.current.value,NAMENV_FIELD).invalid;
        const isEmailValid = ValidateForm(VALIDATE_NV,emailNv.current.value,EMAIL_FIELD).invalid;
        const isCmndValid = ValidateForm(VALIDATE_NV,cmndNv.current.value,CMND_FIELD).invalid;
        const isSdtValid = ValidateForm(VALIDATE_NV,sdtNv.current.value,SDT_FIELD).invalid;

        if(!isIdValid && !isNameValid && !isEmailValid && !isCmndValid && !isSdtValid){
            const submitRes = {
                idNv : [idNv.current.value,setInfoValidId],
                nameNv: [nameNv.current.value,setInfoValidName],
                emailNv: [emailNv.current.value,setInfoValidEmail],
                cmndNv: [cmndNv.current.value,setInfoValidCmnd],
                sdtNv: [sdtNv.current.value,setInfoValidSdt],
            }
            onSubmit(submitRes)
            console.log("gui di thanh cong !")
        }else{
            console.log("gui that bai !")
        }
    }

    const handleEventId = (e)=>{
        const idValue = e.target.value;
        setInfoValidId(ValidateForm(VALIDATE_NV,idValue,IDNV_FIELD));
    }

    const handleNameNv = (e)=>{
        const nameValue = e.target.value;
        setInfoValidName(ValidateForm(VALIDATE_NV,nameValue,NAMENV_FIELD));
    }

    const handleEventEmail = (e)=>{
        const emailValue = e.target.value;
        setInfoValidEmail(ValidateForm(VALIDATE_NV,emailValue,EMAIL_FIELD));
    }
    //
    const handleEventCmnd = (e)=>{
        const cmndValue = e.target.value;
        setInfoValidCmnd(ValidateForm(VALIDATE_NV,cmndValue,CMND_FIELD))
    }

    const handleSdt = (e)=>{
        const sdtValue = e.target.value;
        setInfoValidSdt(ValidateForm(VALIDATE_NV,sdtValue,SDT_FIELD))
    }

    return <>
        <div>
            <TextField
                error={infoValidId.invalid}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Mã nhân viên"
                onChange={handleEventId}
                placeholder={"NV + mã số"}
                inputRef={idNv}
            />
            <span className={`danger ${infoValidId.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidId.message}</span>

            <TextField
                error={infoValidName.invalid}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Tên nhân viên"
                onChange={handleNameNv}
                placeholder={"Nhập tên nhân viên"}
                inputRef={nameNv}
            />
            <span className={`danger ${infoValidName.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidName.message}</span>

            <TextField
                error={infoValidEmail.invalid}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Email"
                onChange={handleEventEmail}
                placeholder={"Nhập email nhân viên"}
                inputRef={emailNv}
            />
            <span className={`danger ${infoValidEmail.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidEmail.message}</span>

            <TextField
                error={infoValidCmnd.invalid}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="CMND"
                onChange={handleEventCmnd}
                placeholder={"Nhập CMND nhân viên"}
                inputRef={cmndNv}
            />
            <span className={`danger ${infoValidCmnd.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidCmnd.message}</span>


            <TextField
                error={infoValidSdt.invalid}
                style={{width:"100%",marginTop:"20px",marginBottom:"0px"}}
                id="outlined-error"
                label="Số điện thoại"
                onChange={handleSdt}
                placeholder={"Nhập số điện thoại nhân viên"}
                inputRef={sdtNv}
            />
            <span className={`danger ${infoValidSdt.invalid?"":"d-none"}`} style={{marginLeft:"10px"}}>{infoValidSdt.message}</span>


            <div className="wrap" style={{marginTop: "40px"}}>
                <Button style={{margin: "10px auto"}} variant="contained" onClick={handleSubmit}>Tạo nhân viên</Button>
            </div>


        </div>
    </>
}