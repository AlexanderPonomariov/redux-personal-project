// Core
import React, { Component } from 'react';
import classNames from 'classnames';

// Components
import Styles from './styles.m.css';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';

export default class Task extends Component {

    componentDidUpdate () {
        this.taskInput.current.focus();
    }

    _handleMessageChange = (e) => {
        const taskMessage = e.target.value;

        if (taskMessage.length >= 50) {
            e.target.value = taskMessage.substr(0, 50);
        }
        this.props.changeTaskMessage({ id: this.props.id, message: e.target.value });
    };

    _handleMessageSubmit = (e) => {
        if (e.key === 'Enter') {
            this.props.editTaskAsync({ ...this.props, message: e.target.value });
            this.props.changeEditTask(false);
        }
        if (e.key === 'Escape') {
            this.props.changeTaskMessage('');
            this.props.changeEditTask(false);
            this.props.changeTaskMessage({ id: this.props.id, message: '' });
        }
    };

    _toggleEdit = (id) => {
        if (id === this.props.isEdited) {
            this.props.changeEditTask(false);
            this.props.changeTaskMessage({ id: this.props.id, message: '' });
        } else {
            this.props.changeEditTask(id);
        }
    };

    taskInput = React.createRef();

    render () {
        const { message, favorite, isEdited, id, completed, deleteTaskAsync, editTaskAsync, editedMessage } = this.props;

        const taskClass = classNames(
            Styles.task,
            {
                [Styles.completed]: completed,
            }
        );

        const taskMessage = editedMessage.get('message') && editedMessage.get('id') === id
            ? editedMessage.get('message')
            : message;

        return (
            <li className = { taskClass }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.complete }
                        color1 = { '#3B8EF3' }
                        color2 = { '#fff' }
                        onClick = { () => editTaskAsync({ ...this.props, completed: !completed }) }
                    />

                    <input
                        // defaultValue = { message }
                        disabled = { isEdited !== id }
                        ref = { this.taskInput }
                        type = 'text'
                        onChange = { this._handleMessageChange }
                        onKeyDown = { this._handleMessageSubmit }
                        value = { taskMessage }
                    />

                </div>

                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.setPriority }
                        onClick = { () => editTaskAsync({ ...this.props, favorite: !favorite }) }
                    />
                    {/*<Star checked = { false } />*/}
                    <Edit
                        inlineBlock
                        checked = { isEdited === id }
                        className = { Styles.edit }
                        onClick = { () => this._toggleEdit(id) }
                    />
                    <Remove
                        inlineBlock
                        onClick = { () => deleteTaskAsync(id) }
                    />
                </div>
            </li>
        );

    }
}
