import style from "../../../styles/CreateTs.module.css"
import {Box} from "@mui/material";
import { useRouter } from 'next/router';
import {createPropertyApi} from "../../../services/property";
import Form from "../../../components/form/form";
import {ID_PROPERTY, NAME_PROPERTY, AMOUNT_PROPERTY} from "../../../helper/validateForm";
import {useRef} from "react";

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

function Create() {
	const router = useRouter();
	const formRef = useRef();

	const handleCreate = async () => {
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
			const res = await createPropertyApi(req);

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


return <Box component="form"
				className={style.form_create}
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
	>
		{console.log("re-render")}
		<h2 className={style.title}>Tạo tài sản</h2>
		<Form ref={formRef} fields={FIELD_PROPERTIES} valids={VALIDATE_PROPERTIES} onSubmit={handleCreate} titleForm={"Tạo tài sản"} />

	</Box>
}

export default Create;
