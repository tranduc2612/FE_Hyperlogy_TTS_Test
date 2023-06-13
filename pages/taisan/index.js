import * as axios from "../../utils/response";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "../../styles/TaiSan.module.css";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Search from "../../components/search/search"
import React, { useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Box, Modal, Pagination, Stack} from "@mui/material";
import {deleteTaiSanApi, getListTaiSanApi} from "../../servicesApi/taisan";
import useStore from "../../hooks/useStore";
import * as actionsTs from "../../actions/taisan"
import generateTime from "../../helper/generateTime";

const PAGE_SIZE = 3;
const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 8,
};
let count = 0;

export default function TaisanIndex() {
	const [search,setSearch] = useState("");
	const [idTsSelected,setIdTsSelected] = useState("");

	// state modal
	const [openModal,setOpenModal] = useState(false);
	const [openModalMessage,setOpenModalMessage] = useState(false);
	const [messageModal,setMessageModal] = useState("Chưa có message !");

	// global state
	const store = useStore();
	const [state,dispatch] = store.taiSan

	const handleSearch = (value)=>{
		setSearch(value);
	}
	const handleOpenModal = (idTs)=>{
		setIdTsSelected(idTs);
		setOpenModal(true)
	}
	const handleCloseModal = (e)=>{
		setOpenModal(false)
	}
	const handleOpenModelMessage = ()=>{
		setOpenModalMessage(true)
	}
	const handleCloseModelMessage = ()=>{
		setOpenModalMessage(false)
	}

	//xoa tai san
	const handleDeleteTaisan = async (e) =>{
		try{
			const res = await deleteTaiSanApi(idTsSelected);
			if(res.success){
				dispatch(actionsTs.deleteTaiSan(idTsSelected));
				setMessageModal(res.message)
				setOpenModalMessage(true)
			}else{
				setMessageModal(res.message)
				setOpenModalMessage(true)
			}
		}catch (e){
			console.log(e)
		}
		setOpenModal(false)
	}

	// get tai san + search phan trang
	useEffect(()=>{
		const fetchApi = async () =>{
			const res = await getListTaiSanApi(1,PAGE_SIZE,search);
			dispatch(actionsTs.getList(res));
		}
		fetchApi()
	},[search])



	const handlePageChange = async (event, page) =>{
		const res = await getListTaiSanApi(page,PAGE_SIZE,search);
		dispatch(actionsTs.getList(res))
	}



	return (
		<section className={style.content}>
			<h1>Danh sách tài sản</h1>
			<Search onSearch={handleSearch} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>
								<b>Mã tài sản</b>
							</TableCell>
							<TableCell align="center">
								<b>Tên tài sản</b>
							</TableCell>
							<TableCell align="center">
								<b>Số lượng</b>
							</TableCell>
							<TableCell align="center">
								<b>Người sở hữu</b>
							</TableCell>
							<TableCell align="center">
								<b>Thời gian thêm</b>
							</TableCell>
							<TableCell align="center">
								<b>Hành động</b>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{state.list.map((row) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell align="center">{row.tentaiSan}</TableCell>
								<TableCell align="center">{row.sl}</TableCell>
								<TableCell align="center">{row.hoten || "Chưa có"}</TableCell>
								<TableCell align="center">{generateTime(row.timecreate)}</TableCell>
								<TableCell
									align="center"
									style={{ display: "flex", justifyContent: "center" }}
								>
									<Link className="custom-btn" href={`taisan/${row.id}`}>
										<InfoIcon />
										<span>Chi tiết</span>
									</Link>
									<Link className="custom-btn default" href={`taisan/update/${row.id}`}>
										<UpgradeIcon />
										<span>Sửa</span>
									</Link>
									<Button className="custom-btn danger" onClick={()=>handleOpenModal(row.id)}>
										<DeleteIcon />
										<span>Xóa</span>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...styleModal }}>
					<h2 id="child-modal-title" style={{textAlign:"center"}}>Thông báo</h2>
					<p id="child-modal-description">
						Bạn có muốn xóa tài sản - {idTsSelected}
					</p>
					<div style={{display:"flex", justifyContent:"space-around"}}>
						<Button cx={{m:1}} variant="outlined" className={"danger"} onClick={handleDeleteTaisan}>Xác nhận</Button>
						<Button cx={{m:1}} variant="outlined" className={"default"} onClick={handleCloseModal}>Hủy</Button>
					</div>
				</Box>
			</Modal>

			<Modal
				open={openModalMessage}
				onClose={handleOpenModelMessage}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...styleModal }}>
					<h2 id="child-modal-title" style={{textAlign:"center"}}>Thông báo</h2>
					<p id="child-modal-description">
						{messageModal}
					</p>
					<div style={{display:"flex", justifyContent:"space-around"}}>
						<Button cx={{m:	1}} variant="outlined" className={"danger"} onClick={handleCloseModelMessage}>Xác nhận</Button>
					</div>
				</Box>
			</Modal>

			<Stack marginTop={"30px"} alignItems="center" spacing={2}>
				<Pagination page={state.currentPage}
							onChange={handlePageChange}
							count={state.pageLength}
							color="primary"
				/>
			</Stack>
		</section>
	);
}
