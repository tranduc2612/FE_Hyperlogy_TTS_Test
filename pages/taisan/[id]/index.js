import style from "../../../styles/ChiTietTaiSan.module.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CardActions,
    CardContent,
    Modal,
    Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import * as axios from "../../../utils/response";
import { useRouter } from 'next/router';
import Search from "../../../components/search/search";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import renderNhanVien from "../../../helper/renderListNv";
import Button from "@mui/material/Button";
import {getTaiSanApi} from "../../../servicesApi/taisan";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function ExpandMoreIcon() {
    return null;
}




function Detail() {
    const router = useRouter();
    const [data, setData] = useState("")
    const [formGan,setFormGan] = useState(false);
    const [rows,setRows] = useState([]);
    const messageRef = useRef();
    const {id} = router.query;


    const renderNhanVienOwner = (res)=>{
        const resData = res.data;
        if(resData != null){
            const dateTime = new Date(resData.timecreate);
            const DateString = dateTime.getDate() + "/" + Number(dateTime.getMonth() + 1) + "/" + dateTime.getFullYear() + "  -  " + dateTime.getHours() + ":" + dateTime.getMinutes();
            if(resData.timeupdate){
                const dateTime = new Date(resData.timeupdate);
                resData.timeupdate = dateTime.getDate() + "/" + Number(dateTime.getMonth() + 1) + "/" + dateTime.getFullYear() + "  -  " + dateTime.getHours() + ":" + dateTime.getMinutes();
            }else{
                resData.timeupdate = "Chưa chỉnh sửa lần nào"
            }
            const newData = {
                ...resData,
                timecreate: DateString
            }
            setData(newData)
        }else{
            router.push("/notfound");
        }
    }

    useEffect(()=>{

        if(id != undefined){
            const fetchApi = async ()=>{
                const data = await getTaiSanApi();
                console.log(data)
            }
            // acti(`/TaiSan/${id}`)
            //     .then((res)=>{
            //         renderNhanVienOwner(res);
            //     })
            //     .catch((e)=>{
            //         console.log(e)
            //     })
        }
    },[id])

    const handleEvenOpenForm = (e)=>{
        setFormGan(!formGan);
        axios.Get(`/NhanVien?page=1&size=10`)
            .then((res)=>{
                setRows(renderNhanVien(res.data));
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const handleSearch = (value) =>{
        axios.Get(`/NhanVien?page=1&size=10&nameNv=${value}`)
            .then((res)=>{
                setRows(renderNhanVien(res.data));
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const handleGan = (e,idNv) =>{
        axios.Post(`/NhanVien/GanTaiSan?idNv=${idNv}&idTs=${id}`)
            .then((res)=>{
                setFormGan(false)
                axios.Get(`/TaiSan/${id}`)
                    .then((res)=>{
                        renderNhanVienOwner(res);
                        messageRef.current.innerText = res.data.message;

                    })
                    .catch((e)=>{
                        console.log(e)
                    })
            })
            .catch((e)=>{
                console.log(e)
            })
    }


    return (  <>
        <CardContent className={style.form_detail}>
            <Typography sx={{ fontSize: 60, textAlign: "center" }} gutterBottom>
                Chi tiết tài sản
            </Typography>
            {/*Mã tài sản*/}
            <Box sx={{display:"flex", alignItems: "center"}}>
                <Typography sx={{fontSize: 25, mr:1}} component="div">
                    Mã tài sản:
                </Typography>

                <Typography sx={{fontSize: 25}} color="text.secondary">
                    {data.id}
                </Typography>
            </Box>

            {/*Tên tài sản*/}
            <Box sx={{display:"flex", alignItems: "center"}}>
                <Typography sx={{fontSize: 25, mr:1}} component="div">
                    Tên tài sản:
                </Typography>

                <Typography sx={{fontSize: 25}} color="text.secondary">
                    {data.tentaiSan}
                </Typography>
            </Box>

            {/*Số lượng */}
            <Box sx={{display:"flex", alignItems: "center"}}>
                <Typography sx={{fontSize: 25, mr:1}} component="div">
                    Số lượng:
                </Typography>

                <Typography sx={{fontSize: 25}} color="text.secondary">
                    {data.sl}
                </Typography>
            </Box>
            {/*Thời gian tạo*/}
            <Box sx={{display:"flex", alignItems: "center"}}>
                <Typography sx={{fontSize: 25, mr:1}} component="div">
                    Thời gian tạo:
                </Typography>

                <Typography sx={{fontSize: 20}} color="text.secondary">
                    {data.timecreate}
                </Typography>
            </Box>
            {/*Thời gian sửa*/}
            <Box sx={{display:"flex", alignItems: "center"}}>
                <Typography sx={{fontSize: 25, mr:1}} component="div">
                    Thời gian sửa gần nhất:
                </Typography>

                <Typography sx={{fontSize: 20}} color="text.secondary">
                    {data.timeupdate}
                </Typography>
            </Box>

            <Box sx={{mt:4}}>
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{backgroundColor: "#c5c5c5"}}
                    >
                        <Typography>Thông tin người sở hữu</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {!data.idNv?<Box sx={{alignItems: "center"}}>
                            <Typography sx={{fontSize: 20}} color="text.secondary">
                                Tài sản này chưa có người sở hữu bạn có muốn gán tài sản không ? <Button variant="outlined" style={{cursor: "pointer"}} onClick={handleEvenOpenForm}>Gán tài sản</Button>
                                {formGan ?<>
                                    <Search onSearch={handleSearch} /> <Box>

                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow color="#3d5afe">
                                                    <TableCell>Mã nhân viên</TableCell>
                                                    <TableCell align="center">Họ và tên</TableCell>
                                                    <TableCell align="center">CMND</TableCell>
                                                    <TableCell align="center">Email</TableCell>
                                                    <TableCell align="center">Sdt</TableCell>
                                                    <TableCell align="center">Gán</TableCell>
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
                                                        <TableCell align="center">
                                                            <Button variant="outlined" onClick={(e)=>handleGan(e,row.maNv)}>Gán</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                </> : <></>}

                            </Typography>
                        </Box>:<>
                            {/*Mã người sở hữu*/}
                            <Box sx={{display:"flex", alignItems: "center"}}>
                                <Typography sx={{fontSize: 25, mr:1}} component="div">
                                    Mã người sở hữu:
                                </Typography>

                                <Typography sx={{fontSize: 20}} color="text.secondary">
                                    {data.idNv}
                                </Typography>
                            </Box>
                            {/*Tên người sở hữu*/}
                            <Box sx={{display:"flex", alignItems: "center"}}>
                                <Typography sx={{fontSize: 25, mr:1}} component="div">
                                    Họ tên người sở hữu:
                                </Typography>

                                <Typography sx={{fontSize: 20}} color="text.secondary">
                                    {data.hoten}
                                </Typography>
                            </Box>

                            {/*CMND*/}
                            <Box sx={{display:"flex", alignItems: "center"}}>
                                <Typography sx={{fontSize: 25, mr:1}} component="div">
                                    CMND:
                                </Typography>

                                <Typography sx={{fontSize: 20}} color="text.secondary">
                                    {data.cmnd}
                                </Typography>
                            </Box>

                            {/*Email*/}
                            <Box sx={{display:"flex", alignItems: "center"}}>
                                <Typography sx={{fontSize: 25, mr:1}} component="div">
                                    Email:
                                </Typography>

                                <Typography sx={{fontSize: 20}} color="text.secondary">
                                    {data.email}
                                </Typography>
                            </Box>

                            {/*Số điện thoại*/}
                            <Box sx={{display:"flex", alignItems: "center"}}>
                                <Typography sx={{fontSize: 25, mr:1}} component="div">
                                    Sdt:
                                </Typography>

                                <Typography sx={{fontSize: 20}} color="text.secondary">
                                    {data.sdt}
                                </Typography>
                            </Box>
                        </>}

                    </AccordionDetails>
                </Accordion>
            </Box>
        </CardContent>

    </> );
}

export default Detail;