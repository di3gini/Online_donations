import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { rootReducer } from './root.reducer'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'primary',
  version: 0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['loading', 'error', 'messages']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleWareEnhancer = applyMiddleware(thunkMiddleware)

const rootStore = createStore(
  persistedReducer,
  composeWithDevTools(middleWareEnhancer)
)

export const store = rootStore
export const persistor = persistStore(rootStore)
