const formatIdTs = new RegExp("^TS\\d+$");
const formatIdNv = new RegExp("^NV\\d+$");
const formatEmail = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
const formatCmnd = new RegExp("^\\d{1,12}$")
const maxLength10 = new RegExp("^(.{0,10})?$");
const maxLength40 = new RegExp("^(.{0,40})?$");
const notSpecialCharacter = /^[\p{L}0-9\s]+$/u;
const numberAndUpper0 = new RegExp("^[1-9]\\d*$")


export const ID_STAFF = 'ID_STAFF'
export const NAME_STAFF = 'NAME_STAFF'
export const IDENTIFY_STAFF = 'IDENTIFY_STAFF'
export const EMAIL_STAFF = 'EMAIL_STAFF'
export const PHONE_STAFF = 'PHONE_STAFF'

export const ID_PROPERTY = 'ID_PROPERTY'
export const NAME_PROPERTY = 'NAME_PROPERTY'
export const AMOUNT_PROPERTY = 'AMOUNT_PROPERTY'

export default function ValidateForm(config,value,field){
    const result = {
        fieldName: field,
        invalid: false,
        message: ""
    }

    const valTypes = config.filter(e=>e.field_name == field)[0];

    for (let i = 0;i < valTypes.val.length ;i++){
        const type = valTypes.val[i];
        switch (type){
            case "required":
                if(value == ""){
                    result.invalid = true;
                    result.message = "Không được để trống trường này !";
                }
                break;
            case "format_nv":
                if(!formatIdNv.test(value)){
                    result.invalid = true;
                    result.message = "Mã nhân viên NV + mã số !";
                }
                break;
            case "format_ts":
                if(!formatIdTs.test(value)){
                    result.invalid = true;
                    result.message = "Mã tài sản TS + mã số !";
                }
                break;
            case "max_length;10":
                if(!maxLength10.test(value)){
                    result.invalid = true;
                    result.message = "Không được quá 10 kí tự !";
                }
                break;
            case "max_length;40":
                if(!maxLength40.test(value)){
                    result.invalid = true;
                    result.message = "Không được quá 40 kí tự !";
                }
                break;
            case "format_email":
                if(!formatEmail.test(value)){
                    result.invalid = true;
                    result.message = "Email không đúng định dạng !";
                }
                break;
            case "format_cmnd":
                if(!formatCmnd.test(value)){
                    result.invalid = true;
                    result.message = "CMND phải nhỏ hơn 12 kí tự và chỉ được nhập số !";
                }
                break;
            case "not_special_character":
                if(!notSpecialCharacter.test(value)){
                    result.invalid = true;
                    result.message = "Trường này không được chứa kí tự đặc biệt !";
                }
                break;
            case "number_upper0":
                if(!numberAndUpper0.test(value)){
                    result.invalid = true;
                    result.message = "Trường này phải là số và lớn hơn 0 !";
                }
                break;
            default:
                result.invalid = false;
                result.message = "Trường này hợp lệ !";
                break;
        }

        if(result.invalid == true){
            break;
        }
    }
    return result
}