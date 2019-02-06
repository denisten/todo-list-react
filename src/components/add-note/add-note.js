import React, { Component } from 'react';

export default class AddNote extends Component{

  state ={
    label: ''
  };

  onLabelChange = (e) =>{
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    });
  };
  render(){
    return(
      <form className ="item-add-form d-flex"
            onSubmit = {this.onSubmit}>
        <input type ="text"
               className = "form-control"
               placeholder = "What needs to be done"
               onChange = {this.onLabelChange}
               value = { this.state.label }/>
        <button type = "button"
        className="btn btn-outline-success btn-sm float-right"
        onClick = {() => this.props.onAddItem(this.state.label)}>
          Add Note
        </button>
      </form>
    )
  }
}
