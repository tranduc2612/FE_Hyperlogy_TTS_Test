import style from "../../../styles/CreateTs.module.css"
import {Box} from "@mui/material";
import { useRouter } from 'next/router';
import FormTs from "../../../components/form/formTs";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {createTaiSanApi} from "../../../servicesApi/taisan";

function Create() {
	const router = useRouter();

	const handleCreate = async (action) => {
		try{
			const TaiSanReq = {
				"id": action.actionId[0],
				"tentaisan": action.actionName[0],
				"sl": action.actionSl[0] == ""? 0 : Number(action.actionSl[0])
			}
			const res = await createTaiSanApi(TaiSanReq);
			if(res.success == false){
				action.actionId[1]({invalid: true,message:res.message})
			}else{
				router.push("/taisan")
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
		<FormTs onSubmit={handleCreate} messageBtn="Tạo tài sản"></FormTs>
	</Box>
}

export default Create;
