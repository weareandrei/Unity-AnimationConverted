import axios from "axios"

export {addNotification} from '../action'

export const GET_SPRITESHEET = 'GET_SPRITESHEET'
export const GET_SPRITESHEET_SUCCESS = 'GET_SPRITESHEET_SUCCESS'
export const GET_SPRITESHEET_FAILURE = 'GET_SPRITESHEET_FAILURE'

const getSpritesheetRequest = ()  => ({
    type: GET_SPRITESHEET
})

const getSpritesheetSuccess = (pngUrl)  => ({
    type: GET_SPRITESHEET_SUCCESS,
    payload: {
        pngUrl
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
            const pngBlob = response.data
            const pngUrl = URL.createObjectURL(pngBlob)
            dispatch(getSpritesheetSuccess(pngUrl))

        })
        .catch((error) => {
            dispatch(getSpritesheetFailure(error.message))
        })
    }
}
