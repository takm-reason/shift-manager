import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

export default class CalendarFormModel {
  @observable week = {};
  @observable date = new Date();

  constructor() {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    this.week = new WeekModel(this.date);
  }
}
