import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

export default class CalendarFormModel {
  @observable week = {};

  constructor() {
    this.week = new WeekModel();
  }
}
