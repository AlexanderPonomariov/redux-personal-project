import { types } from './types';

export const tasksActions = Object.freeze({
    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),
    deleteTask: (taskId) => ({
        type:    types.DELETE_TASK,
        payload: taskId,
    }),
    editTask: (newTaskData) => ({
        type:    types.EDIT_TASK,
        payload: newTaskData,
    }),
    getAllTasks: (tasks) => ({
        type:    types.GET_ALL_TASKS,
        payload: tasks,
    }),
    completeAllTasks: (tasks) => ({
        type: types.COMPLETE_ALL_TASKS,
        payload: tasks,
    }),
});
