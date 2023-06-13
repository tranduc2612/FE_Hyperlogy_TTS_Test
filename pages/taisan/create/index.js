import style from "../../../styles/CreateTs.module.css"
import {Box, TextField} from "@mui/material";
import {useRef, useState} from "react";
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import * as axios from "../../../utils/response";
import FormTs from "../../../components/form/formTs";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

function Create() {
	const router = useRouter()
	const handleCreate = (action) => {
		const TaiSanReq = {
			"id": action.actionId[0],
			"tentaisan": action.actionName[0],
			"sl": action.actionSl[0] == ""? 0 : Number(action.actionSl[0])
		}
		axios.Post(`/TaiSan`,TaiSanReq
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


return <Box component="form"
				className={style.form_create}
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
	>
		<h2 className={style.title}>Tạo tài sản</h2>
		<FormTs onSubmit={handleCreate} messageBtn="Tạo tài sản"></FormTs>
	</Box>
}

export default Create;
