function createData(maTs, name, amount, nameNv, timeCreate) {
    return { maTs, name, amount, nameNv, timeCreate };
}

export default function renderTaiSan(listTaiSan){
    const newRow = [];
    listTaiSan.forEach(e=>{
        let nameOwner = "";
        if(e.idNv == null){
            nameOwner = "Chưa có"
        }else{
            nameOwner = e.hoten + " - " + e.idNv;
        }
        const dateTime = new Date(e.timecreate);
        const DateString = dateTime.getDate() + "/" + Number(dateTime.getMonth() + 1) + "/" + dateTime.getFullYear() + "  -  " + dateTime.getHours() + ":" + dateTime.getMinutes();
        newRow.push(createData(e.id,e.tentaiSan,e.sl,nameOwner,DateString))
    })
    return newRow
}