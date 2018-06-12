import { types } from './types';

export const taskActions = Object.freeze({
    changeEditTask: (taskId) => ({
        type:    types.CHANGE_EDIT_TASK,
        payload: taskId,
    }),
    changeTaskMessage: (message) => ({
        type:    types.CHANGE_TASK_MESSAGE,
        payload: message,
    }),

});
