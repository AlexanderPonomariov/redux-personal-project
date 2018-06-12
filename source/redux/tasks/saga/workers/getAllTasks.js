import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../tasks/actions';

export function* callGetAllTasksWorker () {
    try {
        yield put(uiActions.dataIsLoading(true));

        const response = yield call(fetch, `${url}`, {
            method:  'GET',
            headers: {
                'Authorization': token,
            },
            // body: JSON.stringify({ message: taskMessage }),
        });

        // const { data: task } = yield call([response, response.json]);
        const { data: tasks } = yield call([response, response.json]);

        // console.log('data --> ', data);

        // if (response.status !== 200) {
        //     throw new Error(message);
        // }

        yield put(tasksActions.getAllTasks(tasks));
    } catch (error) {
        // yield put(uiActions.emitError(error, 'createPostWorker'));
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
