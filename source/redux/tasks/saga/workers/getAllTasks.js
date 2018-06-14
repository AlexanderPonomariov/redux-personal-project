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
        });

        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.getAllTasks(tasks));
    } catch (error) {
        console.error('GetAllTasksWorker', error);
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
