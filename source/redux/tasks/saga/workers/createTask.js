import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* callCreateTaskWorker ({ payload: taskMessage }) {
    try {
        yield put(uiActions.dataIsLoading(true));

        const response = yield call(fetch, `${url}`, {
            method:  'POST',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify({ message: taskMessage }),
        });

        const { data: task } = yield call([response, response.json]);

        // if (response.status !== 200) {
        //     throw new Error(message);
        // }

        yield put(tasksActions.createTask(task));
    } catch (error) {
        // yield put(uiActions.emitError(error, 'createPostWorker'));
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
