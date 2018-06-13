import { types } from './types';

export const taskActions = Object.freeze({
    changeEditTask: (taskId) => ({
        type:    types.CHANGE_EDIT_TASK,
        payload: taskId,
    }),
    changeTaskMessage: (messageObj) => ({
        type:    types.CHANGE_TASK_MESSAGE,
        payload: messageObj,
    }),

});
