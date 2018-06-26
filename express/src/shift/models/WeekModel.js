import {observable, computed, action} from 'mobx';

import DateModel from './DateModel';

export default class WeekModel {
  id = Math.random();
  @observable dates = [{}, {}, {}];

  constructor() {
    this.dates = this.dates.map((currentValue, index) => {
      console.log(index);
      return new DateModel(index);
    });
  }
}
