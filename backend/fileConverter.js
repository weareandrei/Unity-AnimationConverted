const fs = require('fs')
const sharp = require('sharp')
const psd2png = require('psd2png')

const psdFilePath = './test/psdFile.psd'
const outputFilePath = './test/psdFile.png'

async function convertPsdToPng() {
    try {
        const psd_file = fs.readFileSync(psdFilePath)
        console.log('psd', psd_file)
        const image = await psd2png(psd_file)

        console.log('png', image)

        sharp.cache(false); // Disable sharp's caching

        // // Write the PNG data to a file
        await sharp(image, { raw: { width: 755, height: 734, channels: 4 } })
            // .raw()
            .toFile(outputFilePath);

        // console.log(`PSD file converted to PNG and saved as ${outputFilePath}`);
    } catch (error) {
        console.error('Error converting PSD to PNG:', error);
    }
}

convertPsdToPng()