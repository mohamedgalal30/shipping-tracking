import { combineReducers } from 'redux';
import { tasksReducer } from './task';
// import { flashMessageReducer } from './core';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    // flashMessages: flashMessageReducer,
});

export default rootReducer;