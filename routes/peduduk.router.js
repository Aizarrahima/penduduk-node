'use strict' //untuk menjalankan hanya pada file ini

const express = require("express")
const pendudukController = require('../controllers/penduduk.controller')
const router = new express.Router();

router.get("/getAll", pendudukController.getAll)
router.get("/getId/:id", pendudukController.getId)
router.post("/add", pendudukController.add)
router.put("/update/:id", pendudukController.update)
router.delete("/delete/:id", pendudukController.delete)

module.exports  = router