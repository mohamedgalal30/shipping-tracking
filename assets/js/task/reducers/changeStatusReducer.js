import * as types from '../actions/types';
    
const initialState = {
    hasPendingRequest: false,
    hasFailure: false,    
};

const updateStatusReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.UPDATE_STATUS_REQUEST:
            return {
                ...state,
                hasPendingRequest: true,
                hasFailure: false,
                requestedStatus: action.status,
                taskId: action.taskId,
            };
        case types.UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                hasPendingRequest: false,
                hasFailure: false,
            };
        case types.UPDATE_STATUS_FAILURE:
            return {
                ...state,
                hasPendingRequest: false,
                hasFailure: true,
            };
        default : return state;
    }
};

export default updateStatusReducer;

