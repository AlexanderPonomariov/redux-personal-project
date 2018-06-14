import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* callDeleteTaskWorker ({ payload: taskId }) {
    try {
        yield put(uiActions.dataIsLoading(true));

        const response = yield call(fetch, `${url}/${taskId}`, {
            method:  'DELETE',
            headers: {
                'Authorization': token,
            },
            body: JSON.stringify({ POST_ID: taskId }),
        });

        if (response.status !== 204) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        yield put(tasksActions.deleteTask(taskId));
    } catch (error) {
        console.error('DeleteTaskWorker', error);
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
