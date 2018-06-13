import { takeEvery } from 'redux-saga/effects';

import { asyncTypes } from './asyncTypes';
import { callCreateTaskWorker } from './workers/createTask';
import { callDeleteTaskWorker } from './workers/deleteTask';
import { callEditTaskWorker } from './workers/editTask';
import { callGetAllTasksWorker } from './workers/getAllTasks';
import { callCompleteAllTasksWorker } from './workers/completeAllTasks';

export const tasksWatchers = Object.freeze({
    * watchCreateTask () {
        yield takeEvery(asyncTypes.CREATE_TASK_ASYNC, callCreateTaskWorker);
    },
    * watchDeleteTask () {
        yield takeEvery(asyncTypes.DELETE_TASK_ASYNC, callDeleteTaskWorker);
    },
    * watchEditTask () {
        yield takeEvery(asyncTypes.EDIT_TASK_ASYNC, callEditTaskWorker);
    },
    * watchGetAllTasks () {
        yield takeEvery(asyncTypes.GET_ALL_TASKS_ASYNC, callGetAllTasksWorker);
    },
    * watchCompleteAllTasks () {
        yield takeEvery(asyncTypes.COMPLETE_ALL_TASKS_ASYNC, callCompleteAllTasksWorker);
    },
});
