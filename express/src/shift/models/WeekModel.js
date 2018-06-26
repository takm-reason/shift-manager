import {observable, computed, action} from 'mobx';

import DateModel from './DateModel';

export default class WeekModel {
  @observable dates = [{}, {}, {}, {}, {}, {}, {}];

  constructor() {
    this.dates = this.dates.map(() => {
      return new DateModel();
    });
  };
};
