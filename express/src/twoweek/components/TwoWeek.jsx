import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Week from './Week';

@observer
class TwoWeek extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered" style={{tableLayout: 'fixed'}}>
          <thead>
            <tr>
              <th className="text-center p-0">月</th>
              <th className="text-center p-0">火</th>
              <th className="text-center p-0">水</th>
              <th className="text-center p-0">木</th>
              <th className="text-center p-0">金</th>
              <th className="text-center p-0">土</th>
              <th className="text-center p-0">日</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.weeks.map((week) => (
              <Week week={week} key={week.id}/>
            ))}
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-success"
            type="submit">
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default TwoWeek;
