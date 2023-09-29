import { createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'; // Import Redux Thunk middleware

import application from '../reducer'
import navigationReducer from '../navigation/reducer'
import spritesheetReducer from "../spritesheet/reducer"

const rootReducer = combineReducers({
    application,
    navigationReducer,
    spritesheetReducer
})

const persistConfig = {
    key: 'root',
    storage,
    // blacklist is for things that you don't want to be stored (persistent)
    blacklist: ['checkout', 'application', 'form', 'navigation', 'order', 'checkoutForm', 'notification', 'featuredStore'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)) // Apply Redux Thunk middleware here
)

const persistor = persistStore(store)

export { store, persistor }
