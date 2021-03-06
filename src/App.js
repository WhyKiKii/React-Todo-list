import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', 'f03e3e', '12b886', '228ae6'];

class App extends Component {
  id = 3;

  state = {
    input: '',
    todos: [
      {id: 0, text: '리액트 소개', checked: false },
      {id: 1, text: '리액트 소개', checked: true },
      {id: 2, text: '리액트 소개', checked: false}
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const {input, todos} = this.state;
    this.setState({
      input: '', // 인풋을 비우고
      todos: todos.concat({ 
      // concat을 사용해서 배열에 추가(리액트 state에서 배열을 다룰 때 push 사용X)
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter면 handleCreate를 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    // 파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는다
    const index = todos.findIndex(todo => todo.id === id)
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열 복사

    // 기존의 값들을 복사하고, checked 값을 덮어씀
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos, color } = this.state;
    const { // 비구조화 할당(this 생략 가능)
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value = {input}
          onKeyPress = {handleKeyPress}
          onChange = {handleChange}
          onCreate = {handleCreate}
          color={color}
        />
      )}>
        Palette ={(
          <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
        )}
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;