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
      lastId: 0,
      todos: [{
        value: 'Just do it', done: true
      }],
      value: ''
    }
  }

  addItem(e) {
    e.preventDefault()
    let todos = this.state.todos
    if (this.state.value.length != 0) {
      let todo = {
        id: this.state.lastId++,
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

  removeItem(id) {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: this.state.todos
    })
  }

  markDone(id) {
    let todos = this.state.todos.map(todo => {
      if(todo.id === id){
        todo.done = !todo.done | false
      }
      return todo
    })
    this.setState({
      todos: todos
    })
  }

  get todoNotComplete() {
    return this.state.todos.filter(todo => !todo.done)
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
          onClickClose={this.removeItem.bind(this, todo.id)}
          onClickItem={this.markDone.bind(this, todo.id)}
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

        <footer class="footer">
          <span class="todo-count">
            <strong>{ this.todoNotComplete.length }</strong> { this.todoNotComplete.length == 1 ? 'item' : 'items' } left</span>
        </footer>
      </section>
    )
  }
}

export default App;
