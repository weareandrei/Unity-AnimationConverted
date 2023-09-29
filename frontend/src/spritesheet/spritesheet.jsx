/* eslint-disable max-lines */
import React from 'react'
import Dropzone from './component/dropzone'
import PropTypes from 'prop-types'
import * as actions from './action'
import {connect} from 'react-redux'
import find from 'lodash/find'
import {forEach} from "lodash";

const MAX_FILE_SIZE_BYTES = 4000

class SpritesheetPage extends React.Component {

    static propTypes = {
        currentPage: PropTypes.string,
        isMobile: PropTypes.bool.isRequired,
        spriteSheet: PropTypes.object,

        addNotification: PropTypes.func.isRequired,
        getSpritesheet: PropTypes.func.isRequired
    }

    static defaultProps = {
        spriteSheets: null
    }

    componentDidMount() {
        // TODO : highlight active nav button
    }

    render() {
        return this.renderSpriteSheet()
    }

    renderSpriteSheet = () => (
        <div className="SpritesheetPage">
            <h2>Spritesheet Animation Handler</h2>
            {this.renderDropZone()}
            {this.props.spriteSheets && this.renderSpriteSheetImage()}
        </div>
    )

    renderDropZone = () =>
        <Dropzone onDropAction={this.getSpritesheet}/>

    renderSpriteSheetImage = () =>
        <img src={this.props.spriteSheets[0]} alt="Processed Image"/>

    onDrop = (acceptedImages) => {
        if (this.imagesValid(acceptedImages)) {
            this.props.addNotification('Valid File', 'warning')
            this.getSpritesheet(acceptedImages)
        } else {
            this.props.addNotification('Invalid File', 'error')
            // Clear the Dropzone input files list
            // this.dropzoneRef.current.getInputProps().onChange({ target: { files: [] } });
        }
    }

    imagesValid = async (images) => {
        const invalidImage = await find(images, async (image) => {

            const isValid = true

            if (!isValid) {
                  return true
            }
        })

        return invalidImage === undefined
    }

    getSpritesheet = (files) => {
        console.log(files)
        const formData = new FormData();
        formData.append("name", 'Some Name');
        for(let i =0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // Display the values
        for (const value of formData.values()) {
            console.log(value)
        }

        this.props.getSpritesheet(formData)
    }

    // isImageValid = async (image) =>
        // new Promise(async (resolve, reject) => {
        //     try {
        //         // Load the PSD file using the psd package
        //         const psd = await PSD.fromFile(image)
        //
        //         // Check if the PSD file has more than one layer
        //         if (psd.tree().descendants().length <= 1) {
        //             resolve(false)
        //             console.log('Not enough layers')
        //             return
        //         }
        //
        //         // Check if all layers are rasterized or flat
        //         const hasNonRasterizedLayers = psd.tree().descendants().some((layer) => !layer.isGroup() && !layer.isRaster())
        //         if (hasNonRasterizedLayers) {
        //             resolve(false)
        //             console.log('Contains non-rasterized layers')
        //             return;
        //         }
        //
        //         // Check the size of the PSD file (e.g., not too large)
        //         const fileSize = image.size; // Assuming `image` is a File object
        //         if (fileSize > MAX_FILE_SIZE_BYTES) {
        //             resolve(false)
        //             console.log('File size exceeds the maximum allowed size')
        //             return;
        //         }
        //
        //         console.log('All checks passed')
        //         resolve(true)
        //     } catch (error) {
        //         console.error('Error while validating PSD:', error)
        //         resolve(false) // An error occurred during validation
        //     }
        // })

}

const style = {
    imageContainer: {
        cursor: 'pointer',
        borderRadius: '3px',
        lineHeight: '0',

        width: '500px',
        height: '200px',
        border: '2px dashed #cccccc',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0 auto',
}

}

export default connect((state) => ({
    spriteSheets: state.spritesheetReducer.spriteSheetsGenerated,
    isMobile: false
}), actions)(SpritesheetPage)
