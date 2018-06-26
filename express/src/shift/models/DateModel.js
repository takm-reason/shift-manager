import {observable, computed, action} from 'mobx';

import OneLineModel from './OneLineModel';

export default class WeekModel {
  id = Math.random();
  @observable lines = [{}, {}, {}];

  constructor() {
    this.lines = this.lines.map((currentValue, index) => {
      console.log(index);
      return new OneLineModel(index);
    });
  }
}
