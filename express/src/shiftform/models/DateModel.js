import {observable, computed, action} from 'mobx';

import LineModel from './LineModel';

export default class WeekModel {
  id = Math.random();

  @observable date = {};
  @observable lines = [{}, {}, {}, {}];

  constructor(date) {
    this.date = date;
    this.lines = this.lines.map((currentValue, index, array) => {
      return new LineModel(this.date, index, array.length);
    });
  }
}
