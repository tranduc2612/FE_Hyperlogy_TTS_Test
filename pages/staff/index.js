import style from "../../styles/TaiSan.module.css";
import Search from "../../components/search/search";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, { useEffect, useState } from "react";
import { getListStaffApi } from "../../services/staff";

function NhanVien() {
	const [rows, setRows] = useState([]);
	const [search, setSearch] = useState("");

	const handleSearch = (value) => {
		setSearch(value);
	};
	useEffect(() => {
		const fetchApi = async () => {
			const res = await getListStaffApi(1, 10, search);
			console.log(res)
			setRows(res);
		};
		fetchApi();
	}, [search]);

	return (
		<section className={style.content}>
			<h1>Danh sách nhân viên</h1>
			<Search onSearch={handleSearch} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>
								<b>Mã nhân viên</b>
							</TableCell>
							<TableCell align="center">
								<b>Tên nhân viên</b>
							</TableCell>
							<TableCell align="center">
								<b>CMND</b>
							</TableCell>
							<TableCell align="center">
								<b>Email</b>
							</TableCell>
							<TableCell align="center">
								<b>Số điện thoại</b>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.idStaff}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.idStaff}
								</TableCell>
								<TableCell align="center">{row.fullName}</TableCell>
								<TableCell align="center">{row.citizenIdentification}</TableCell>
								<TableCell align="center">{row.email}</TableCell>
								<TableCell align="center">{row.phoneNumber}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}

export default NhanVien;
