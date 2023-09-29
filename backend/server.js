const express = require('express')
const multer = require('multer') // For handling file uploads
const PSD = require('psd')
const sharp = require('sharp')
const fs = require('fs')
const cors = require('cors')
const psd2png = require('psd2pngl')
const path = require('path')

const app = express()

app.use(cors()) // Cross-Origin Resource Sharing

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post("/psdToSpritesheet", upload.array("files"), uploadFiles)

function uploadFiles(req, res) {
    console.log(req.files)

    // Here, req.files will contain the uploaded files in memory
    const processedFiles = req.files.map(file => ({
        originalName: file.originalname.replace(/\.[^.]+$/, '.png'),
        // buffer: convertPsdToPng(file.buffer)
        pngBuffer: psd2png(file.buffer)
    }))

    console.log(processedFiles)
    // You can send the processed files back in the response
    res.json({ files: processedFiles })
}

async function convertPsdToPng(psdBuffer) {
    const psdFile = PSD.fromDumbBuffer(psdBuffer)
    const psdFileParsed = await psdFile.parse(psdBuffer)
    return await psdFileParsed.image.toPng()

}

app.listen(8081, () => console.log('App started'))
