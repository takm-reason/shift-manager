import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Date from './Date';

@observer
class Week extends React.Component {
  render() {
    return this.props.week.dates.map((date) => (
      <Date date={date} key={date.id}/>
    ));
  }
}

export default Week;
