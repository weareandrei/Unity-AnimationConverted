const express = require('express')
const multer = require('multer') // For handling file uploads
const psd = require('psd')
const sharp = require('sharp')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(cors()); // Cross-Origin Resource Sharing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for handling file uploads
const storage = multer.memoryStorage()
const upload = multer({ dest: "uploads/" });

// API endpoint to receive PSD/PSB files

app.post("/psdToSpritesheet", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}



// app.post('/psdToSpritesheet', (req, res) => {
//     const formData = req.body
//
//     console.log(formData)
//
//     // Display the values
//     for (const value of formData.values()) {
//         console.log(value)
//     }
//
//     if (!file) {
//         return res.status(400).json({ message: 'No file uploaded' })
//     }
//
//     console.log('\n\n\n\n\n file : ', file)
//
//
//     // Read and parse the PSD file
//     const psdBuffer = file.buffer
//
//     console.log('\n\n\n\n\n PSD buffer : ', psdBuffer)
//
//     const psdFile = psd.fromDib(psdBuffer)
//
//     console.log('\n\n\n\n\n PSD file : ', psdFile)
//
//     // Access the first layer (you can adapt this part based on your PSD structure)
//     const layer = psdFile.tree().descendants()[0]
//
//     console.log('\n\n\n\n\n PSD layer : ', layer)
//
//
//     // Convert the layer to PNG
//     const layerImageData = layer.layer.image.toPng()
//
//     // Send the PNG image back to the client
//     res.contentType('image/png')
//     sharp(layerImageData).toBuffer((err, data) => {
//         if (err) {
//             res.status(500).json({ message: 'Error processing PSD file' })
//         } else {
//             res.send(data)
//         }
//     })
// })

app.listen(8081, () => console.log('App started'))