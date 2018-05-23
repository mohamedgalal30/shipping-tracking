import { combineReducers } from 'redux';
import * as types from '../actions/types';


const initialInfo = {
    isFetching: false,
    filter: {},
    sort: "deliveryDate DESC"
};

function infoReducer(state = initialInfo, action) {
    switch (action.type) {
        case types.REQUEST_TASKS:
            return {
                ...state,
                isFetching: true,
                requestedSort: action.sort,
                requestedFilter: action.filter,
            };
        case types.RECEIVE_TASKS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                sort: state.requestedSort,
                filter: state.requestedFilter,
            };
        case types.RECEIVE_TASKS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default: return state;
    }
}

const initialData = [];

function dataReducer(state = initialData, action) {
    switch (action.type) {
        case types.REQUEST_TASKS:
            return []
        case types.RECEIVE_TASKS_SUCCESS:
            return action.tasks;
        case types.RECEIVE_TASKS_FAILURE:
            return [...state];
        case types.UPDATE_STATUS_SUCCESS:
            let tasks = state;
            let newTasks = tasks.map(task => {
                if (task.id == action.taskId) {
                    task.status = action.status;
                }
                return task
            })
            return [...newTasks];

        default: return state;
    }
}

const listReducer = combineReducers({
    data: dataReducer,
    info: infoReducer,
});

export default listReducer;

