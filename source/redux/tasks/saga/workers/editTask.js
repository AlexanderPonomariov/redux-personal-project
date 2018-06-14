import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* callEditTaskWorker ({ payload: newTaskData }) {
    try {
        yield put(uiActions.dataIsLoading(true));

        const response = yield call(fetch, `${url}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify([{
                id:        newTaskData.id,
                message:   newTaskData.message,
                completed: newTaskData.completed,
                favorite:  newTaskData.favorite,
            }]),
        });

        const { data: editedTask, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.editTask(editedTask.pop()));
    } catch (error) {
        console.error('EditTaskWorker', error);
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
