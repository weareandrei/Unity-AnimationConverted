import {GET_SPRITESHEET, GET_SPRITESHEET_SUCCESS, GET_SPRITESHEET_FAILURE} from './action'

const initialState = {
    spriteSheetGenerated: {},
    isLoading: false
}

const spritesheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPRITESHEET:
            console.log('GET_SPRITESHEET')
            return {
                ...state,
                isLoading: true
            }
        case GET_SPRITESHEET_SUCCESS:
            console.log('GET_SPRITESHEET_SUCCESS')
            return {
                ...state,
                isLoading: false,
                spriteSheetGenerated: action.payload.pngUrl
            }
        case GET_SPRITESHEET_FAILURE:
            console.log('GET_SPRITESHEET_FAILURE')
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default spritesheetReducer
