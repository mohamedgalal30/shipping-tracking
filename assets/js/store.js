import { createStore, applyMiddleware, compose } from 'redux'
import rootRducer from './rootReducer'
import thunk from 'redux-thunk';

const store = createStore(
    rootRducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
)
export default store