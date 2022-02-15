'use strict' // agar tidak memakan banyak memori

const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        const sql = 'select * from data_penduduk'
        db.query(sql, (err, results) => {
            if (err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Semua Data",
                data: results
            })
        })
    },
    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from data_penduduk where id = '${id}'`, (err, results) => {
            if (err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results
            })
        })
    },
    add: (req, res) => {
        let penduduk = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        db.query(`insert into data_penduduk set ?`, penduduk, (err, results) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil Menambahkan Data",
                    data: results
                })
            }
        })
    },
    update: (req, res) => {
        const id = req.params.id
        let penduduk = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        db.query(`update data_penduduk set ? where id = '${id}'`, penduduk, (err, results) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil Update Data",
                    data: results
                })
            }
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        db.query(`delete from data_penduduk where id = '${id}'`, (err, results) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil Hapus Data",
                    data: results
                })
            }
        })
    }
}