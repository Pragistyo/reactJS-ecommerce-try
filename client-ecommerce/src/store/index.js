import { createStore, applyMiddleware } from 'redux'
// import compoReducer from '../reducers/compoReducer'
import rootReducer from '../reducers/index';
import reduxThunk from 'redux-thunk'

// const store = createStore(
//    compoReducer, /* preloadedState, */
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
);

export default store