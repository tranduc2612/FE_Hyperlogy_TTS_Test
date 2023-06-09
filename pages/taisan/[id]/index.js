import style from "../../../styles/ChiTietTaiSan.module.css"
import {Accordion, AccordionDetails, AccordionSummary, Box, CardActions, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "../../../api/config";
import { useRouter } from 'next/router';

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
    const {id} = router.query;
    useEffect(()=>{
        if(id != undefined){
            axios.get(`/TaiSan/${id}`)
                .then((res)=>{
                    const resData = res.data.data;
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

                })
                .catch((e)=>{
                    console.log(e)
                })
        }
    },[id])
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
                        {!data.idNv?<Box sx={{display:"flex", alignItems: "center"}}>
                            <Typography sx={{fontSize: 20}} color="text.secondary">
                                Tài sản này chưa có người sở hữu bạn có muốn gán tài sản không ? Gán tài sản
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