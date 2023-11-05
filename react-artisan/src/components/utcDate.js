export default function utcDate() {
    // create a new Date object
    let dt = new Date();
         
    // convert the date object to ISO string format
    dt = dt.toUTCString();
    
    // split the ISO string into date and time
    dt = dt.split("T");

    // separate the date and time into separate variables
    const date = dt[0];
    const time = dt[1].slice(0, 8);
    
    // combine date and time into a single MySQL-format string
    const mysqlTime = date + " " + time;
    return mysqlTime;
}