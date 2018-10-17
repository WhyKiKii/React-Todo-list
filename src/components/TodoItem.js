import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const {text, checked, id, onToggle, onRemove, color} = this.props;
        // text: todo의 내용, checked: 체크박스의 상태, id: todo의 고유아이디, onToggle: 체크박스를 키고 끄는 함수, onRemove: 아이템을 삭제시키는 함수

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle이 실행되지 않도록 한다
                    onRemove(id)}
                }>&times;</div>
                <div style={{color}} className={`todo-text ${checked ? ' checked' : ''}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

export default TodoItem;