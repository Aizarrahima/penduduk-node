'use strict' // agar tidak memakan banyak memori

const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secret = '#$@^%$^%*&%$$@&'

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}


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
    },
    registrasi: (req, res) => {
            const {
                nama_lengkap,
                email,
                password
            } = req.body
            if (!nama_lengkap, !email || !password) {
                res.status(402).json({
                    message: "nama lengkap, email dan password harus diisi!"
                })
            }
            return db.query('insert into pengguna set ?', {
                nama_lengkap,
                email,
                password: hashPassword(password)
            }, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        err
                    })
                }
                return res.json({
                    message: 'registrasi berhasil',
                    data: result
                })
            })
        },
        login: (req, res) => {
            const {
                email,
                password
            } = req.body
            if (!email || !password) res.status(402).json({
                message: 'email dan password harus diisi.'
            })
            return db.query('select * from pengguna where email = ?', email, (err, result) => {
                if (err) {
                    return req.status(500).json({
                        err
                    })
                }
                const user = result[0]
                if (typeof user === 'undefined') {
                    return res.status(401).json({
                        message: 'user tidak ditemukan'
                    })
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(401).json({
                        message: 'email dan password tidak sesuai'
                    })
                }
                const token = jwt.sign({
                    data: user
                }, secret)
                return res.json({
                    message: 'Login berhasil. Silahkan menggunakan token dibawah ini untuk mengakses endpoint private lain',
                    token
                })
            })
        },
}