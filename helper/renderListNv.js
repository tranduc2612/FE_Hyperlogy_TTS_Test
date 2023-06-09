function createData(maNv, name, cmnd, email, sdt) {
	return { maNv, name, cmnd, email, sdt };
}


export default function renderNhanVien(listNhanVien){
	const newRow = [];
	listNhanVien.forEach(e=>{
		const dateTime = new Date(e.timecreate);
		const DateString = dateTime.getDate() + "/" + Number(dateTime.getMonth() + 1) + "/" + dateTime.getFullYear() + "  -  " + dateTime.getHours() + ":" + dateTime.getMinutes();
		newRow.push(createData(e.idNv,e.hoten,e.cmnd,e.email,e.sdt))
	})
	return newRow
}