import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All'},
    { name: 'active', label: 'Active'},
    { name: 'done', label: 'Done'}
  ];
  render(){
    const {filters, onMarkChange} = this.props;
    let classNames = 'btn btn-outline-secondary';

    const buttons = this.buttons.map(({name, label }) => {
      if (name === filters) {
        classNames = 'btn btn-info';
      }
      else {
        classNames = 'btn btn-outline-secondary';
      }
      return (
        <button key={name}
                type = "button"
                className = {classNames}
                onClick = { () => onMarkChange(name)}>
          {label}
        </button>
      );
    });

    return(
      <div className="btn-group">
        {buttons}
      </div>
    );
  };
};
