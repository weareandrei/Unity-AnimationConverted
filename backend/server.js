const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const cors = require('cors')
const fs = require('fs')
const map = require("lodash/map")
const StreamToBuffer = require('stream-to-buffer')

const PSD = require('psd')
const PNG = require('pngjs').PNG

const app = express()

app.use(cors()) // Cross-Origin Resource Sharing

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const tmpStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = './temp' // Create a 'temp' directory in your project
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
        const file = req.files[0]

        const psdPath = file.path
        const pngPath = psdPath.replace('.psd', '.png')

        // Open the PSD file
        PSD.open(psdPath)
            .then(async (psd) => {
                const layers = await getPsdLayers(psd, psdPath)
                const layerPng = fs.readFileSync(layers[0])

                return sharp({
                    create: {
                        width: 3000,
                        height: 3000,
                        channels: 4, // 4 channels for RGBA
                        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
                    }
                })
                .composite(
                    map(layers, (layer, index) => ({
                        input: layer,
                        top: index * 1000,
                        left: index * 1000
                    }))
                )
                .toFile(pngPath)

                // Save the PSD as PNG
                // return psd.image.saveAsPng(pngPath)
            })
            .then(() => {
                const pngBuffer = fs.readFileSync(pngPath)
                res.contentType('image/png')
                    .send(pngBuffer)
            })
            .catch((err) => {
                console.error('Error:', err)
                res.status(500)
                    .json({ error: 'An error occurred while processing files.' })
            })
            .finally(() => {
                // Clean up temporary files
                // fs.unlinkSync(psdPath)
                // fs.unlinkSync(pngPath)
            })
    } catch (error) {
        console.error('Error processing files:', error)
        res.status(500).json({ error: 'An error occurred while processing files.' })
    }
})

const getPsdLayers = async (psd, fileName) => {
    const layersPsd = psd.tree().descendants();
    const layerPromises = [];

    for (const node of layersPsd) {
        const layerFilePath = fileName.replace('.psd', `-${node.name}.png`);
        layerPromises.push(saveLayerAsPng(node, layerFilePath));
    }

    try {
        return await Promise.all(layerPromises);
    } catch (err) {
        console.error(err.stack);
        return [];
    }
};

async function saveLayerAsPng(node, layerFilePath) {
    try {
        await node.saveAsPng(layerFilePath);
        return layerFilePath;
    } catch (err) {
        console.error(err.stack);
        return null; // or some value indicating failure
    }
}

app.listen(8081, () => console.log('App started'))
