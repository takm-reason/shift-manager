import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Month from './Month';

@observer
class CalendarForm extends React.Component {
  render() {
    return (
      <form action="/" method="POST">
        <table className="table table-bordered" style={{tableLayout: 'fixed'}}>
          <thead>
            <tr>
            <th
                className="text-center"
                colSpan="3"
              ></th>
              <th
                className="text-center"
                colSpan="3"
              >6~9</th>
              <th
                className="text-center"
                colSpan="3"
              >9~12</th>
              <th
                className="text-center"
                colSpan="3"
              >12~15</th>
              <th
                className="text-center"
                colSpan="3"
              >15~18</th>
              <th
                className="text-center"
                colSpan="3"
              >18~21</th>
              <th
                className="text-center"
                colSpan="3"
              >21~0</th>
              <th
                className="text-center"
                colSpan="3"
              >0~3</th>
              <th
                className="text-center"
                colSpan="3"
              >3~6</th>
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
