// Core
import React, { Component } from 'react';
import { Form, Control, Errors } from 'react-redux-form';

// Instruments
import Styles from "./styles.m.css";

export default class CreateTaskForm extends Component {

    _createTask = () => {
        this.props.changeEditTask(false);
        this.props.createTaskAsync(this.props.newTaskMessage);
    };

    render () {

        return (
            <Form
                className = { Styles.createTaskForm }
                model = 'forms.newTask'
                onSubmit = { this._createTask }>
                <Errors
                    messages = { {
                        empty: 'Task message can\'t be empty',
                    } }
                    model = 'forms.newTask.taskMessage'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid
                    }
                />
                <Control.text
                    errors = { {
                        empty: (val) => !val || !val.length,
                    } }
                    errorstyle = { Styles.error }
                    id = 'forms.newTask.taskMessage'
                    maxLength = { 50 }
                    model = 'forms.newTask.taskMessage'
                    placeholder = { "Описание моей новой задачи" }
                />

                <button type = 'submit'>
                    Добавить задачу
                </button>
            </Form>
        );
    }
}
