export default function generateTime(time){
    const dateTime = new Date(time);
    const DateString = dateTime.getDate() + "/" + Number(dateTime.getMonth() + 1) + "/" + dateTime.getFullYear() + "  -  " + dateTime.getHours() + ":" + dateTime.getMinutes();
    return DateString;
}