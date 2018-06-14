import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* callCompleteAllTasksWorker ({ payload: tasks }) {
    try {
        yield put(uiActions.dataIsLoading(true));

        const completedTasks = tasks.map((task) => {
            return {
                id:        task.get('id'),
                message:   task.get('message'),
                completed: true,
                favorite:  task.get('favorite'),
            };
        });

        const response = yield call(fetch, `${url}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify(completedTasks),
        });

        const { data: editedTasksArr, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.completeAllTasks(editedTasksArr));
    } catch (error) {
        console.error('CompleteAllTasksWorker', error);
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
