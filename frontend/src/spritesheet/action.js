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

export const getSpritesheetOld = (formData) => {
    return (dispatch) => {

        ////////////// WORKING (1) //////////////
        // const filesProcessed = map(files, (file) =>
        //     URL.createObjectURL(file)
        // )
        // dispatch(getSpritesheetSuccess(filesProcessed))

        //////////// WORKING (2) //////////////
        // const imageUrls = [];
        //
        // const fileEntries = formData.getAll('files');
        //
        // for (const file of fileEntries) {
        //
        //     ////////// ALSO WORKING //////////////
        //     // const blob = new Blob([file]);
        //     // const imageUrl = URL.createObjectURL(blob);
        //
        //          ////////// ALSO WORKING ? //////////////
        //          const pngBuffer = // GET PNG BUFFER
        //          const blob = new Blob([pngBuffer], { type: 'image/png' });
        //          const imageUrl = URL.createObjectURL(blob);
        //
        //     const imageUrl = URL.createObjectURL(file);
        //     imageUrls.push(imageUrl);
        // }
        // dispatch(getSpritesheetSuccess(imageUrls))

        // dispatch(getSpritesheetRequest())
        //
        // fetch("http://localhost:8081/psdToSpritesheet", {
        //     method: 'POST',
        //     body: formData
        //     // headers: {
        //     //     "Content-Type": "multipart/form-data"
        //     // }
        // })
        // .then((response) => {
        //     if (response.ok) {
        //         return response.json()
        //     } else {
        //         throw new Error(`HTTP Error: ${response.status}`)
        //     }
        // })
        // .then((data) => {
        //     // Assuming your response JSON contains the processed files in an array named 'files'
        //     const processedFiles = data.files
        //     console.log(processedFiles)
        //
        //     const imagesUrls = map(processedFiles, (file) => {
        //         // Create a Blob object from the file buffer and create a URL for it
        //         console.log(file.buffer)
        //         const blob = new Blob([file.buffer])
        //         // return URL.createObjectURL(blob)
        //         console.log(formData.get('files'))
        //         return formData.get('files')
        //     })
        //
        //     console.log(imagesUrls)
        //     dispatch(getSpritesheetSuccess(imagesUrls))
        // })
        // .then((response) => {
        //     console.log(response)
        //     const pngBlob = response.data
        //     const pngUrl = URL.createObjectURL(pngBlob)
        //     dispatch(getSpritesheetSuccess(pngUrl))
        //
        // })
        // .catch((error) => {
        //     console.log(error)
        //     dispatch(getSpritesheetFailure(error.message))
        // })
    }
}

export const getSpritesheet = (formData) => {
    return (dispatch) => {
        dispatch(getSpritesheetRequest())

        fetch("http://localhost:8081/psdToSpritesheet", {
            method: 'POST',
            body: formData
        })
        .then((response) => {
            if (response.ok) {
                return response.blob()
            } else {
                throw new Error(`HTTP Error: ${response.status}`)
            }
        })
        .then((data) => {
            console.log('\n DATA')
            console.log(data)
            const imagesUrls = [URL.createObjectURL(data)]
            // const processedFiles = data.body
            // const imagesUrls = map(processedFiles, (file) => {
            //     console.log('\n FILE')
            //     console.log(file)
            //     console.log('\n BUFFER')
            //     console.log(file.buffer)
            //     const blob = new Blob([file.buffer.data], { type: 'image/png' });
            //     return URL.createObjectURL(blob)
            // })

            dispatch(getSpritesheetSuccess(imagesUrls))
        })
        .catch((error) => {
            console.log(error)
            dispatch(getSpritesheetFailure(error.message))
        })
    }
}
