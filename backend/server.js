const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const PSD = require('psd')
const PNG = require('pngjs').PNG;

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tmpStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = './temp'; // Create a 'temp' directory in your project
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir)
        }
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})

const upload = multer({ storage: tmpStorage })

app.post('/psdToSpritesheet', upload.array('files'), async (req, res) => {
    try {
        const file = req.files[0];

        const psdPath = file.path;
        const pngPath = psdPath.replace('.psd', '.png');

        // Open the PSD file
        PSD.open(psdPath)
            .then((psd) => {
                // Save the PSD as PNG
                return psd.image.saveAsPng(pngPath);
            })
            .then(() => {
                // Read the saved PNG file and get its buffer
                const pngBuffer = fs.readFileSync(pngPath);

                // Set the content type and send the PNG buffer as a response
                res.contentType('image/png').send(pngBuffer);
            })
            .catch((err) => {
                console.error('Error:', err);
                res.status(500).json({ error: 'An error occurred while processing files.' });
            })
            .finally(() => {
                // Clean up temporary files
                fs.unlinkSync(psdPath);
                fs.unlinkSync(pngPath);
            });
    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).json({ error: 'An error occurred while processing files.' });
    }
});

app.listen(8081, () => console.log('App started'));
