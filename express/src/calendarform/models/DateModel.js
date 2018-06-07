import {observable, computed, action} from 'mobx';

export default class DateModel {
  id = Math.random();
  @observable date = {};
  @observable value;
  @observable text;
  @observable checked = false;
  @observable name = 'insert';

  @action
  onCheckDate(sleepId, sleepDate) {
    if (new Date(sleepDate).getTime() == this.date.getTime()) {
      this.name = 'delete';
      this.value = sleepId;
    }
  }

  constructor(date) {
    this.date = date;
    this.value = date.toLocaleString();
    this.text = date.getDate();
  }
}
