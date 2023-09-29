import axios from "axios"
import map from "lodash/map";

export {addNotification} from '../action'

export const GET_SPRITESHEET = 'GET_SPRITESHEET'
export const GET_SPRITESHEET_SUCCESS = 'GET_SPRITESHEET_SUCCESS'
export const GET_SPRITESHEET_FAILURE = 'GET_SPRITESHEET_FAILURE'

const getSpritesheetRequest = ()  => ({
    type: GET_SPRITESHEET
})

const getSpritesheetSuccess = (pngUrls)  => ({
    type: GET_SPRITESHEET_SUCCESS,
    payload: {
        pngUrls
    }
})

const getSpritesheetFailure = (response)  => ({
    type: GET_SPRITESHEET_FAILURE,
    payload: {
        error: response
    }
})

export const getSpritesheet = (formData) => {
    return (dispatch) => {
        dispatch(getSpritesheetRequest())

        fetch("http://localhost:8081/psdToSpritesheet", {
            method: 'POST',
            body: formData
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // }
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`HTTP Error: ${response.status}`)
            }
        })
        .then((data) => {
            // Assuming your response JSON contains the processed files in an array named 'files'
            const processedFiles = data.files
            console.log(processedFiles)

            const imagesUrls = map(processedFiles, (file) => {
                // Create a Blob object from the file buffer and create a URL for it
                const blob = new Blob([file.buffer], { type: 'image/png' })
                return URL.createObjectURL(blob)
            })

            console.log(imagesUrls)
            dispatch(getSpritesheetSuccess(imagesUrls))
        })
        // .then((response) => {
        //     console.log(response)
        //     const pngBlob = response.data
        //     const pngUrl = URL.createObjectURL(pngBlob)
        //     dispatch(getSpritesheetSuccess(pngUrl))
        //
        // })
        .catch((error) => {
            console.log(error)
            dispatch(getSpritesheetFailure(error.message))
        })
    }
}
