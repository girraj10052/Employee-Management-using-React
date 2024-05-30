import mysql from 'mysql'
import mysql1 from 'mysql2/promise'

const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12710628",
    password: "bpefP6WUva",
    database: "sql12710628"
})

const con1 = mysql1.createPool({
    host: "sql12.freesqldatabase.com",
    user: "sql12710628",
    password: "bpefP6WUva",
    database: "sql12710628"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})
export {con, con1};

