import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Line from './Line';

@observer
class Date extends React.Component {
  render() {
    return this.props.date.lines.map((date) => (
      <Line date={date} key={date.id}/>
    ));
  }
}

export default Date;
