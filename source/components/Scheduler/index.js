// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

// Components
import Styles from "./styles.m.css";
import Spinner from "../Spinner/";
import Task from "../Task/";
import Checkbox from "../../theme/assets/Checkbox";

// Instruments
import { tasksActionsAsync } from "../../redux/tasks/saga/asyncActions";
import { taskActions } from "../../redux/task/actions";
import { tasksActions } from "../../redux/tasks/actions";

const mapStateToProps = (state) => {
    return {
        tasks:         state.tasks,
        dataIsLoading: state.ui.get('dataIsLoading'),
        isEdited:      state.task.get('isEdited'),
        editedMessage: state.task.get('taskMessage'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...taskActions,
                ...tasksActionsAsync,
                ...tasksActions,
            },
            dispatch,
        ),
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {
    componentDidMount () {
        this.props.actions.getAllTasksAsync();
    }

    _createTask = (e) => {
        e.preventDefault();

        const taskMessage = e.target.taskMessage.value;

        if (taskMessage.length < 1 || taskMessage.length > 50) {
            return false;
        }

        this.props.actions.createTaskAsync(taskMessage);
        e.target.taskMessage.value = '';
    };

    _handleTaskInput = (e) => {
        const taskMessage = e.target.value;

        if (taskMessage.length >= 50) {
            e.target.value = taskMessage.substr(0, 50);
        }
    };

    render () {

        const { tasks, dataIsLoading, isEdited, actions, editedMessage } = this.props;

        const tasksFavorite = tasks.filter((task) => task.get('favorite') && !task.get('completed')).map((task) => (
            <Task
                { ...actions }
                completed = { task.get("completed") }
                editedMessage = { editedMessage }
                favorite = { task.get("favorite") }
                id = { task.get("id") }
                isEdited = { isEdited }
                key = { task.get("id") }
                message = { task.get("message") }
            />
        ));

        const tasksUsual =tasks.filter((task) => !task.get('favorite') && !task.get('completed')).map((task) => (
            <Task
                { ...actions }
                completed = { task.get("completed") }
                editedMessage = { editedMessage }
                favorite = { task.get("favorite") }
                id = { task.get("id") }
                isEdited = { isEdited }
                key = { task.get("id") }
                message = { task.get("message") }
            />
        ));

        const tasksCompleated = tasks.filter((task) => task.get('completed')).map((task) => (
            <Task
                { ...actions }
                completed = { task.get("completed") }
                editedMessage = { editedMessage }
                favorite = { task.get("favorite") }
                id = { task.get("id") }
                isEdited = { isEdited }
                key = { task.get("id") }
                message = { task.get("message") }
            />
        ));


        return (
            <section className = { Styles.scheduler }>
                <Spinner spin = { dataIsLoading } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <form>
                            <input placeholder = { "Поиск" } type = 'search' onChange = { this._getFilterString } />
                        </form>
                    </header>
                    <section>
                        <form onSubmit = { this._createTask }>
                            <input
                                name = 'taskMessage'
                                placeholder = { "Описание моей новой задачи" }
                                type = 'text'
                                onChange = { this._handleTaskInput }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                { tasksFavorite }
                                { tasksUsual }
                                { tasksCompleated }
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = { "#3B8EF3" } color2 = { "#fff" } />
                        <div>Все задачи выполнены</div>
                    </footer>
                </main>
            </section>
        );
    }
}
