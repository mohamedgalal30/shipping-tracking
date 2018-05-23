import * as types from './types';
import TasksApi from '../tasksApi';

/////// Tasks list actions //////////////////
export const requestTasks = (params) => {
    return {
        type: types.REQUEST_TASKS,
        ...params
    };
};

export const receiveTasksSuccess = (tasks, totalCount) => {
    return { type: types.RECEIVE_TASKS_SUCCESS, tasks, totalCount };
};

export const receiveTasksFailure = () => {
    return { type: types.RECEIVE_TASKS_FAILURE };
};

export const fetchTasks = (params) => {
    return (dispatch, getState) => {
        const isFetching = getState().tasks.list.info.isFetching;
        if (isFetching) return;
        dispatch(requestTasks(params));
        return TasksApi.fetchTasks(params)
            .then(response => {

                const totalCount = response.total;
                const tasks = response.list;

                dispatch(receiveTasksSuccess(tasks, totalCount));

            }).catch(error => {
                dispatch(receiveTasksFailure());
            });
    };
};
/////// End Tasks list actions //////////////////


/////// Update staus actions //////////////////
export const requestUpdateStatus = (taskId, status) => {
    return {
        type: types.UPDATE_STATUS_REQUEST,
        taskId,
        status,
    };
};

export const updateStatusSuccess = (taskId, status) => {
    return { type: types.UPDATE_STATUS_SUCCESS, taskId, status };
};

export const updateStatusFailure = () => {
    return { type: types.UPDATE_STATUS_FAILURE };
};

export const updateStatus = (taskId, status) => {
    return (dispatch, getState) => {
        const hasPendingRequest = getState().tasks.changeStatus.hasPendingRequest;
        if (hasPendingRequest) return;

        dispatch(requestUpdateStatus(taskId, status));
        return TasksApi.updateStatus(taskId, status)
            .then(response => {
                dispatch(updateStatusSuccess(taskId, status));
            }).catch(error => {
                dispatch(updateStatusFailure());

            });
    };
};
/////// End Update staus actions //////////////////




