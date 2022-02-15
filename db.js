
'use strict' // untuk menjalankan semua perintah atau function yang ada pada file ini

const mysql = require("mysql")

// koneksi
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penduduk"
})

module.exports = db;