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
  setData(sleepId, sleepDate) {
    this.month.onCheckDate(sleepId, sleepDate);
  }

  @action
  nextMonth = () => {
    if (this.month.weeks[this.month.weeks.length - 1].hidden) {
      this.displayMonth(1);
    }
  }

  @action
  prevMonth = () => {
    if (this.month.weeks[0].hidden) {
      this.displayMonth(-1);
    }
  }

  @action
  displayMonth = (i) => {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + i,
      this.date.getDate()
    );
    this.month.displayMonth(this.date);
  }

  constructor() {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    this.month = new MonthModel(this.date);
    this.month.displayMonth(this.date);
  }
}
