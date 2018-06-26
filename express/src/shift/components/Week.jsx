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
      </tbody>
    );
  }
}

export default Month;
