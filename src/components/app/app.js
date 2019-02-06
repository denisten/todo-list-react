import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddNote from '../add-note';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    term: '',
    todoData: [
      { label: 'Drink Coffee', important: false, done: false, id: 1 },
      { label: 'Make Awesome App', important: true, done: false, id: 2 },
      { label: 'Have a lunch', important: false, done: false, id: 3 }
    ],
    filters: 'active'
  };

  deleteItem = (id) => {
    this.setState (({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id == id);
      const newArray = [
        ...todoData.slice(0, ind),
        ...todoData.slice(ind + 1)
        ];
      return{
        todoData: newArray
      };
    });
  };

  onMarkChange = (filters) => {
    this.setState({filters});
  }

  addItem = (label) => {
    const newItem = {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }
    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];
      return{
        todoData: newArray
      };
    });
  };

  onToggleDone = (id) => {
    this.setState (({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id);
      const oldArray = todoData[ind];
      const newArray = {...oldArray, done: !oldArray.done};
      const answer = [...todoData.slice(0, ind), newArray, ...todoData.slice(ind + 1)];
      return{
        todoData: answer
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState (({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id == id);
      const oldArray = todoData[ind];
      const newArray = {...oldArray, important: !oldArray.important};
      const answer = [...todoData.slice(0, ind), newArray, ...todoData.slice(ind + 1)];
      return{
        todoData: answer
      };
    });
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  search = (items, term) => {
    if(term.length === 0){
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items;
    }
  }

  render(){
    const visibleItems = this.filter(this.search(this.state.todoData, this.state.term), this.state.filters);
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange = {this.onSearchChange }/>
          <ItemStatusFilter filters = {this.state.filters}
                            onMarkChange = {this.onMarkChange}/>
        </div>

        <TodoList todos={visibleItems}
        onDeleted = { this.deleteItem }
        onToggleDone = { this.onToggleDone }
        onToggleImportant = { this.onToggleImportant }/>
        <AddNote
        onAddItem = { this.addItem }/>
      </div>
    );
  };
};
