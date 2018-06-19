import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Month from './Month';

@observer
class CalendarForm extends React.Component {
  render() {
    return (
      <form action="/" method="POST">
        <table className="table" style={{tableLayout: 'fixed'}}>
          <thead>
            <tr>
              <th
                className="text-center"
                colSpan="3"
                onClick={this.props.store.prevMonth}
              >&lt;&lt;prev</th>
              <th className="text-center">{
                this.props.store.date.getMonth() + 1
              }月</th>
              <th
                className="text-center"
                colSpan="3"
                onClick={this.props.store.nextMonth}
              >next&gt;&gt;</th>
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
