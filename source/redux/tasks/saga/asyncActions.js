import { asyncTypes } from './asyncTypes';

export const tasksActionsAsync = Object.freeze({
    createTaskAsync: (taskMessage) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: taskMessage,

    }),
    deleteTaskAsync: (taskId) => ({
        type:    asyncTypes.DELETE_TASK_ASYNC,
        payload: taskId,

    }),
    editTaskAsync: (newTaskData) => ({
        type:    asyncTypes.EDIT_TASK_ASYNC,
        payload: newTaskData,

    }),
    getAllTasksAsync: () => ({
        type: asyncTypes.GET_ALL_TASKS_ASYNC,
    }),
    completeAllTasksAsync: (tasks) => ({
        type:    asyncTypes.COMPLETE_ALL_TASKS_ASYNC,
        payload: tasks,
    }),
});
