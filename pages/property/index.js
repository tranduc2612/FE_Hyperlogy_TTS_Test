import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "../../styles/TaiSan.module.css";
import Link from "next/link";
import Search from "../../components/search/search"
import React, { useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Box, Modal, Pagination, Stack} from "@mui/material";
import {deletePropertyApi, getPropertiesApi} from "../../services/property";
import generateTime from "../../helper/generateTime";
import useDebounce from "../../hooks/useDebounce";

const PAGE_SIZE = 2;

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

export default function PropertyIndex() {
	const [search,setSearch] = useState("");
	const [idSelected,setIdSelected] = useState("");
	const [listProper,setListProper] = useState([]);
	const [page,setPage] = useState({
		size: 0,
		total: 0,
		items: 0,
		current: 1
	})
	// state modal
	const [openModal,setOpenModal] = useState(false);
	const [openModalMessage,setOpenModalMessage] = useState(false);
	const [messageModal,setMessageModal] = useState("Chưa có message !");
	const valueDebounced = useDebounce(search,500)

	// Event OpenModal
	const handleSearch = (value)=>{
		setSearch(value);
	}
	const handleOpenModal = (idTs)=>{
		setIdSelected(idTs);
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
	const handleDeleteProperty = async (e) =>{
		try{
			const res = await deletePropertyApi(idSelected);
			if(res.success){
				setMessageModal(res.message)
				setOpenModalMessage(true)
				if(listProper.length == 1){
					await fetchApi(page.current - 1,page.size,search)
				}else{
					await fetchApi(page.current,page.size,search)
				}
			}else{
				setMessageModal(res.message)
				setOpenModalMessage(true)
			}
		}catch (e){
			console.log(e)
		}
		setOpenModal(false)
	}

	// lấy API
	const fetchApi = async (currentPage,sizePage,nameSearch) =>{
		try{
			const res = await getPropertiesApi(currentPage,sizePage,nameSearch);
			setListProper(res.data);
			setPage({
				...page,
				size: sizePage,
				current: currentPage,
				total: res.totalPage
			})
		}catch (e){
			console.log(e)
		}
	}

	// get tai san + search phan trang
	useEffect(()=>{
		fetchApi(1,PAGE_SIZE,valueDebounced)
	},[valueDebounced])


	// chuyển trang
	const handlePageChange = async (event, page) =>{
		await fetchApi(page, PAGE_SIZE, search);
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
						{listProper && listProper.map(e=>{
							const {property, staff} = e
							return (<TableRow
								key={property.idProperty}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{property.idProperty}
								</TableCell>
								<TableCell align="center">{property.nameProperty}</TableCell>
								<TableCell align="center">{property.amount}</TableCell>
								<TableCell align="center">{property.idStaff?`${staff.fullName} - ${staff.idStaff}`:"Chưa có"}</TableCell>
								<TableCell align="center">{generateTime(property.timeCreate)}</TableCell>
								<TableCell
									align="center"
									style={{ display: "flex", justifyContent: "center" }}
								>
									<Link className="custom-btn" href={`property/${property.idProperty}`}>
										<span>Chi tiết</span>
									</Link>
									<Link className="custom-btn default" href={`property/update/${property.idProperty}`}>
										<span>Sửa</span>
									</Link>
									<Button className="custom-btn danger" onClick={()=>handleOpenModal(property.idProperty)}>
										<span>Xóa</span>
									</Button>
								</TableCell>
							</TableRow>)
						})}

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
						Bạn có muốn xóa tài sản - {idSelected}
					</p>
					<div style={{display:"flex", justifyContent:"space-around"}}>
						<Button cx={{m:1}} variant="outlined" className={"danger"} onClick={handleDeleteProperty}>Xác nhận</Button>
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
				<Pagination page={page.current}
							onChange={handlePageChange}
							count={page.total}
							color="primary"
				/>
			</Stack>
		</section>
	);
}
