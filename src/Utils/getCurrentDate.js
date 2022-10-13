const getCurrentDate = () => {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth();
    const day = current.getDate();
    const hour = current.getHours();
    const minute = current.getMinutes();
    const second = current.getSeconds();
    const milisecond = current.getMilliseconds();
    const date = year + '-' + month  + '-' + day + 'T'+ hour + ':' + minute + ':' + second + '.' + milisecond 

    return date;
}

export default getCurrentDate;