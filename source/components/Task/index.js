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

    _handleMessageChange = (e) => {
        const taskMessage = e.target.value;

        if (taskMessage.length >= 50) {
            e.target.value = taskMessage.substr(0, 50);
        }
        this.props.changeTaskMessage(e.target.value);
    };

    _handleMessageSubmit = (e) => {
        if (e.key === 'Enter') {
            this.props.editTaskAsync({ ...this.props, message: e.target.value });
            this.props.changeEditTask(false);
        }
        if (e.key === 'Escape') {
            this.props.changeTaskMessage('');
            this.props.changeEditTask(false);
        }
    };

    _toggleEdit = (id) => {
        if (id === this.props.isEdited) {
            this.props.editTask({ ...this.props, message: this.props.editedMessage });
            this.props.editTaskAsync({ ...this.props, message: this.props.editedMessage });
            this.props.changeEditTask(false);
        } else {
            this.props.changeEditTask(id);
        }
    };

    render () {
        const { message, favorite, isEdited, id, completed, deleteTaskAsync, editTaskAsync, editedMessage } = this.props;

        const taskClass = classNames(
            Styles.task,
            {
                [Styles.completed]: completed,
            }
        );

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
                        defaultValue = { message }
                        disabled = { isEdited !== id }
                        type = 'text'
                        onChange = { this._handleMessageChange }
                        onKeyDown = { this._handleMessageSubmit }
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
