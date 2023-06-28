import {TextField} from "@mui/material";
import style from "../../styles/CreateTs.module.css";
import {Fragment, useState, forwardRef, useImperativeHandle, useMemo} from "react";
import ValidateForm from "../../helper/validateForm";
import Button from "@mui/material/Button";


function Form({fields = [],valids = [], onSubmit, titleForm = "Chưa có title"},ref){
    const initValid = useMemo(()=>{
        console.log("run-memo")
        const temp = [];
        valids.map(valid=>{
            const initValue = {
                fieldName: valid.field_name,
                value: fields.filter(e=>e.field_name == valid.field_name)[0].init_value,
                invalid: false,
                message: ""
            }
            temp.push(initValue);
        })
        return temp
    },[])

    const [infoValid,setInfoValid] = useState(initValid)

    useImperativeHandle(ref,()=>{
        return{
            getValue: ()=>{
                return infoValid
            },
            setValue: (value)=>{
              setInfoValid(value)
            }
        }
    })

    const handleEvent = (value,field) =>{
        const updatedValid = infoValid.map(e=>{
            if(e.fieldName == field){
                return {
                    ...e,value,...ValidateForm(valids,value,field)
                }
            }
            return e
        })
        setInfoValid(updatedValid)
    }

    const handleSubmit = ()=>{
        const lastCheck = infoValid.map(e=>{
            const resultValid = ValidateForm(valids,e.value,e.fieldName);
            return {
                ...e,...resultValid
            }
        })
        setInfoValid(lastCheck)

        let flag = 0;
        lastCheck.forEach(e=>{
            if(e.invalid == true){
                flag++;
            }
        })
        if(flag == 0){
            onSubmit([lastCheck,setInfoValid])
        }
    }

    return (
        <div>
            {fields.map(field=>{
                return (
                    <Fragment key={field.field_name}>
                        <TextField
                            error={infoValid.filter(e=>e.fieldName == field.field_name)[0]?.invalid}
                            className={style.input_form}
                            style={{ width: "100%", marginTop: "20px", marginBottom: "0px" }}
                            id="outlined-error"
                            label={field.label}
                            onChange={(e) => handleEvent(e.target.value,field.field_name)}
                            placeholder={field.place_holder}
                            value={infoValid.filter(e=>e.fieldName == field.field_name)[0].value}
                        />
                        <span
                            className={`danger`}
                            style={{ marginLeft: "10px" }}
                        >
					        {infoValid.filter(e=>e.fieldName == field.field_name)[0]?.message}
				        </span>
                    </Fragment>
                )
            })}

            <div className="wrap" style={{marginTop: "40px"}}>
                <Button style={{margin: "10px auto"}} variant="contained" onClick={handleSubmit}>{titleForm}</Button>
            </div>
        </div>
    )
}

export default forwardRef(Form)
