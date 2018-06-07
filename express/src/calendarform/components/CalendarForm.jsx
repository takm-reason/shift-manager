import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Month from './Month';

@observer
class CalendarForm extends React.Component {
  render() {
    return (
      <form action="/" method="POST">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" colSpan="7">{
                this.props.store.date.getMonth() + 1
              }月</th>
            </tr>
            <tr>
              <th className="text-center">月</th>
              <th className="text-center">火</th>
              <th className="text-center">水</th>
              <th className="text-center">木</th>
              <th className="text-center">金</th>
              <th className="text-center">土</th>
              <th className="text-center">日</th>
            </tr>
          </thead>
          <Month month={this.props.store.month}/>
        </table>
        <style>
          {`input[type=checkbox]:checked + .btn.insert{
            border-radius: 100em/100em;
            color: #fff;
            background-color: #5bc0de;
            border-color: #46b8da;
          }`}
        </style>
        <style>
          {`input[type=checkbox] + .btn.delete{
            border-radius: 100em/100em;
            color: #fff;
            background-color: #5bc0de;
            border-color: #46b8da;
          }`}
        </style>
        <style>
          {`input[type=checkbox]:checked + .btn.delete{
            border: none;
            color: #000;
            background-color: #fff;
          }`}
        </style>
        <div className="text-right">
          <button
            className="btn btn-success"
            type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default CalendarForm;
