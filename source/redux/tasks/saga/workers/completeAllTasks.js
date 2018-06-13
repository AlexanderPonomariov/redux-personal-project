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


        console.log(completedTasks);

        const response = yield call(fetch, `${url}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify(completedTasks),
        });

        const { data: editedTasksArr } = yield call([response, response.json]);
        // const { data: task } = yield call([response, response.json]);
        // const { data: tasks } = yield call([response, response.json]);

        // console.log('data --> ', data);

        // if (response.status !== 200) {
        //     throw new Error(message);
        // }

        yield put(tasksActions.completeAllTasks(editedTasksArr));
    } catch (error) {
        // yield put(uiActions.emitError(error, 'createPostWorker'));
    } finally {
        yield put(uiActions.dataIsLoading(false));
    }

}
