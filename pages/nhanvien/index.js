import style from "../../styles/TaiSan.module.css";
import Search from "../../components/search/search";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, {useEffect, useState} from "react";
import * as axios from "../../utils/response";
import renderNhanVien from "../../helper/renderListNv";

function NhanVien() {
    const [rows,setRows] = useState([])
    const handleSearch = (value) =>{
        axios.Get(`/NhanVien?page=1&size=10&nameNv=${value}`)
            .then((res)=>{
                console.log(res)
                setRows(renderNhanVien(res.data.data));
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    useEffect(()=>{
        axios.Get(`/NhanVien?page=1&size=10`)
            .then((res)=>{
                console.log(res)
                setRows(renderNhanVien(res.data.data));
            })
            .catch((e)=>{
                console.log(e)
            })
    },[])

    return ( <section className={style.content}>
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
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.maNv}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.cmnd}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.sdt}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </section> );
}

export default NhanVien;