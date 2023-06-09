import axios from "../../api/config";
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
import React,{useEffect, useState} from "react";
import renderTaiSan from "../../helper/renderListTs";
import Button from "@mui/material/Button";
import {Box, Modal, Pagination, Stack} from "@mui/material";

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

export default function BasicTable() {
	const [rows,setRows] = useState([]);
	const [search,setSearch] = useState("");
	const [currentPage,setCurrentPage] = useState(1);
	const [lengthList,setLengthList] = useState(0);

	const [openModal,setOpenModal] = useState(false);
	const [openModalMessage,setOpenModalMessage] = useState(false);
	const [messageModal,setMessageModal] = useState("Chưa có message !");
	const [idTsSelected,setIdTsSelected] = useState("")

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
	const handleDeleteTaisan = (e) =>{
		axios.delete(`/TaiSan/${idTsSelected}`)
			.then((res)=>{
				const isSuccess = res.data.success;
				if(isSuccess){
					const newList = [...rows].filter(e=>e.maTs != idTsSelected);
					setRows(newList);
					setMessageModal(res.data.message)
					setOpenModalMessage(true)
				}else{
					setMessageModal(res.data.message)
					setOpenModalMessage(true)
				}
			})
			.catch((e)=>{
				console.log(e)
			})
		setOpenModal(false)
	}

	const getListTsApi = (page,size,name)=>{
		axios.get(`/taiSan?page=${page}&size=${size}&nameTs=${name}`)
			.then((res)=>{
				setRows(renderTaiSan(res.data.data.list));
				setLengthList(res.data.data.length)
			})
			.catch((e)=>{
				console.log(e)
			})
	}


	// get all tai san
	useEffect(()=>{
		getListTsApi(1,PAGE_SIZE,search)
	},[search])



	const handlePageChange = (event, page) =>{
		getListTsApi(page,PAGE_SIZE,search);
		setCurrentPage(page);
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
						{rows.map((row) => (
							<TableRow
								key={row.maTs}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.maTs}
								</TableCell>
								<TableCell align="center">{row.name}</TableCell>
								<TableCell align="center">{row.amount}</TableCell>
								<TableCell align="center">{row.nameNv}</TableCell>
								<TableCell align="center">{row.timeCreate}</TableCell>
								<TableCell
									align="center"
									style={{ display: "flex", justifyContent: "center" }}
								>
									<Link className="custom-btn" href={`taisan/${row.maTs}`}>
										<InfoIcon />
										<span>Chi tiết</span>
									</Link>
									<Link className="custom-btn default" href={`taisan/update/${row.maTs}`}>
										<UpgradeIcon />
										<span>Sửa</span>
									</Link>
									<Button className="custom-btn danger" onClick={()=>handleOpenModal(row.maTs)}>
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
				<Pagination page={currentPage}
							onChange={handlePageChange}
							count={lengthList}
							color="primary"
				/>
			</Stack>
		</section>
	);
}
