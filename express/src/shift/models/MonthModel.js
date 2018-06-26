import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

export default class MonthModel {
  @observable weeks = [{}, {}, {}, {}, {}, {}, {}];

  constructor() {
    this.weeks = this.weeks.map(() => {
      return new WeekModel();
    });
  };
};
