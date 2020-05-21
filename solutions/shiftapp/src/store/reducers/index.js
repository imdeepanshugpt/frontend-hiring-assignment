import { combineReducers } from 'redux';

const data = (state = '', action) => {
    if (action.type === 'GET_SHIFTS') {
        return action.payload;
    }
    return [];
}

const rootReducer = combineReducers({
    data: data
});

export default rootReducer;