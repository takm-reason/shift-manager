import {observable, computed, action} from 'mobx';

import MonthModel from './MonthModel';

export default class CalendarFormModel {
  @observable month = {};

  constructor() {
    this.month = new MonthModel();
  }
}
