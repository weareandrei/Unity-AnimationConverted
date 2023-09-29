import {NAVIGATE_TO_PAGE, UPDATE_NAV_HEIGHT} from './action'

const initialState = {
    currentPage: 'Main',
    navigationHeight: 0
}

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE_TO_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case UPDATE_NAV_HEIGHT: {
            console.log("Update nav height, height: ", action.height)
            return {
                ...state,
                navigationHeight: getNavigationHeight(),
            }
        }

        default:
            return state
    }
}

const getNavigationHeight = () => {
    const navigationComponent = document.getElementById('navigationBar')
    const navHeight = navigationComponent ? navigationComponent.offsetHeight : 65
    return navHeight
}

export default navigationReducer
