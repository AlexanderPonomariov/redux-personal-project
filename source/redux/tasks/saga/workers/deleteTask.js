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

        // const { data: task } = yield call([response, response.json]);
        // const data = yield call([response, response.json]);

        // console.log('callDeleteTaskWorker data', data);

        // if (response.status !== 200) {
        //     throw new Error(message);
        // }

        yield put(tasksActions.deleteTask(taskId));
    } catch (error) {
        // yield put(uiActions.emitError(error, 'createPostWorker'));
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
