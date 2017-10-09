import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let cn = ''
    cn += this.props.done ? ' completed' : ' ';

    return (
      <ul className="todo-list">
        <li className={cn} onClick={this.props.onClickItem}>
          <label >{this.props.value}</label>
          <button className="destroy" onClick={this.props.onClickClose}></button>
        </li>
      </ul>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [{
        value: 'Hello, world!', done: true
      }],
      value: ''
    }
  }

  addItem(e) {
    e.preventDefault()
    let todos = this.state.todos

    if (this.state.value.length != 0) {
      let todo = {
        value: this.state.value,
        done: false
      }
      todos = [todo, ...todos]

      this.setState({ todos: todos, value: '' })
    }
    this.refs.todo.value = ''
    // prevent form submit event 
    return false
  }

  removeItem(i) {
    this.state.todos.splice(i, 1)
    this.setState({
      todos: this.state.todos
    })
  }

  markDone(i) {
    let todos = this.state.todos
    let todo = this.state.todos[i]
    todos.splice(i, 1)
    if(todo){
      todo.done = !todo.done
      todo.done ? todos.push(todo) : todos.unshift(todo)
    }
    this.setState({
      todos: todos
    })
  }

  handleFormInput(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    let todos = this.state.todos.map((todo, i) => {
      return (
        <Item
          key={i}
          value={todo.value}
          done={todo.done}
          onClickClose={this.removeItem.bind(this, i)}
          onClickItem={this.markDone.bind(this, i)}
        />
      )
    })
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
            <form
              className="form-horizontal"
              onSubmit={this.addItem.bind(this)}>
              <div className="input-group">
              <input type="text" ref="todo" className="new-todo" placeholder="What needs to be done?" onChange={this.handleFormInput.bind(this)} />
              </div>
            </form>
        </header>
            {todos}
      </section>
    )
  }
}

export default App;
