import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

export default class CalendarFormModel {
  @observable week = {};
  @observable date = new Date();
  @observable users;
  @observable sleep;
  @observable shift;

  @action
  addUsers(users) {
    this.users = users;
  }

  @action
  addSleep(sleep) {
    this.sleep = sleep;
  }

  @action
  addShift(shift) {
    this.shift = shift;
  }

  constructor() {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    this.week = new WeekModel(this.date);
  }
}
