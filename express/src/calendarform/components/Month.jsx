import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Week from './Week';

@observer
class Month extends React.Component {
  render() {
    return (
      <tbody>
        {this.props.month.weeks.map((week) => (
          <Week week={week} key={week.id}/>
        ))}
        <tr className="sr-only"><td><input
          type="text"
          name="insertlength"
          value={this.props.month.insertCount}
          readOnly
        /></td></tr>
        <tr className="sr-only"><td><input
          type="text"
          name="deletelength"
          value={this.props.month.deleteCount}
          readOnly
        /></td></tr>
      </tbody>
    );
  }
}

export default Month;
