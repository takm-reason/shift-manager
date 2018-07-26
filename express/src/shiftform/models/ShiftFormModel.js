import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

export default class ShiftFormModel {
  @observable week = {};
  @observable date = new Date();
  @observable users;
  @observable sleep;
  @observable shift;

  @action
  setDataUsers(userid, username) {
    console.log(userid);
  };

  @action
  setDataPlans(planid, userid) {
    console.log(planid);
  };

  constructor() {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    this.week = new WeekModel(this.date);
  }
}
