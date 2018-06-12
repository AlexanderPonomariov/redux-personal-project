// Core
import { all } from 'redux-saga/effects';

// Instruments
import { tasksWatchers } from '../redux/tasks/saga';


export function* rootSaga () {
    yield all([
        tasksWatchers.watchCreateTask(),
        tasksWatchers.watchDeleteTask(),
        tasksWatchers.watchEditTask(),
        tasksWatchers.watchGetAllTasks()
    ]);
}
