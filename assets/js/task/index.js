import reducer from './reducers/tasksReducer';
import * as actions from './actions/tasks';
import * as actionTypes from './actions/types';
import * as components from './components';


export const tasksReducer = reducer;
export const tasksActions = actions;
export const taskActionTypes = actionTypes;
export const taskComponents = components;

export default { reducer, actions, actionTypes, components };