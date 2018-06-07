import {observable, computed, action} from 'mobx';

import MonthModel from './MonthModel';

export default class CalendarFormModel {
  @observable month = {};
  @observable date = new Date();

  @computed
  get insertCount() {
    return this.month.insertCount;
  }

  @computed
  get deleteCount() {
    return this.month.deleteCount;
  }

  @action
  onCheckDate(sleepId, sleepDate) {
    this.month.onCheckDate(sleepId, sleepDate);
  }

  constructor() {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    this.month = new MonthModel(this.date);
  }
}
