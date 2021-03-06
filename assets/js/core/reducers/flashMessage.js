import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_ALL_FLASH_MESSAGES } from '../actions/types';
// import shortid from 'shortid';
// import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE: {
      return [
        ...state,
        {
          type: action.message.type,
          text: action.message.text
        }
      ];
    }
    case DELETE_FLASH_MESSAGE: {
      const index = action.index;
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;
    }
    case DELETE_ALL_FLASH_MESSAGES: {
      return [];
    }

    default: return state;
  }
}
