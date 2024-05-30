import mysql from 'mysql'
import mysql1 from 'mysql2/promise'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

const con1 = mysql1.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})
export {con, con1};

