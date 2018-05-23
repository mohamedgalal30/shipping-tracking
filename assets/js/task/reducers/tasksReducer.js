import { combineReducers } from 'redux';
import listReducer from './listReducer';
import changeStatusReducer from './changeStatusReducer';

const tasksReducer = combineReducers({
    list: listReducer,
    changeStatus: changeStatusReducer,
});

export default tasksReducer;