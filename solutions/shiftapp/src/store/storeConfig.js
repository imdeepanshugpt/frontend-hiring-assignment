import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';

const configureStore = () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? compose(
                applyMiddleware(reduxThunk),
                window.__REDUX_DEVTOOLS_EXTENSION__(),
            )
            : applyMiddleware(reduxThunk),
    );
    return store;
}
export default configureStore();