const express = require('express');
const multer = require('multer');
const Psd = import("@webtoon/psd");
const psd2png = require("psd2png");
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const outputFilePath = './test/psdFile.png'

app.post('/psdToSpritesheet', upload.array('files'), async (req, res) => {
    try {
        const processedFiles = await Promise.all(
            req.files.map(async (file) => {
                return {
                    originalName: file.originalname,
                    buffer: file.buffer
                }
            })
        )

        const imagePSD = processedFiles[0].buffer
        const imagePNG = await psd2png(imagePSD)

        // const sharpImage = await sharp(image)
        // await sharpImage.toFile(outputFilePath)

        res.type('image/png')
            .send(imagePNG)
            // .json({ files: processedFiles });
    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).json({ error: 'An error occurred while processing files.' });
    }
})


// app.post('/psdToSpritesheet', upload.array('files'), async (req, res) => {
//     try {
//         // Here, req.files will contain the uploaded files in memory
//         const processedFiles = await Promise.all(
//             req.files.map(async (file) => {
//                 console.log('------------------------')
//                 console.log(file.mimetype)
//                 if (file.mimetype === 'image/vnd.adobe.photoshop' ||
//                     file.mimetype === 'application/x-photoshop') {
//                     console.log(' : is an image/psd')
//
//                     const psd_file = fs.readFileSync('./test/psdFile.psd');
//                     const resizedPngBuffer = psd2png(psd_file.buffer);
//
//                     console.log(resizedPngBuffer)
//                     // // Extract and process layers
//                     // const pngImages = await Promise.all(
//                     //     psdImage.children.map(async (layer) => {
//                     //         // Convert each layer to PNG
//                     //         const pngBuffer = await layer.toPng();
//                     //
//                     //         // Use sharp to resize or modify the PNG if needed
//                     //         const resizedPngBuffer = await sharp(pngBuffer)
//                     //             .resize(200, 200) // Example: Resize to 200x200 pixels
//                     //             .toBuffer();
//                     //
//                     //         return resizedPngBuffer;
//                     //     })
//                     // )
//
//                     // console.log(pngImages)
//
//                     return {
//                         originalName: file.originalname.replace(/\.[^.]+$/, '.png'),
//                         buffer: resizedPngBuffer,
//                     };
//                 } else {
//                     console.log(' : is NOT an image/psd')
//                     // For non-PSD files, just pass them along
//                     return {
//                         originalName: file.originalname,
//                         buffer: file.buffer,
//                     };
//                 }
//             })
//         );
//
//         res.json({ files: processedFiles });
//     } catch (error) {
//         console.error('Error processing files:', error);
//         res.status(500).json({ error: 'An error occurred while processing files.' });
//     }
// });

app.listen(8081, () => console.log('App started'));
