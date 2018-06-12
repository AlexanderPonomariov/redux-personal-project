// Core
import { combineReducers } from 'redux';

// Instruments
import { tasksReducer as tasks } from '../redux/tasks/reducers';
import { taskReducer as task } from '../redux/task/reducers';
import { uiReducer as ui } from '../redux/ui/reducers';

export const rootReducer = combineReducers({
    tasks,
    task,
    ui,
});
