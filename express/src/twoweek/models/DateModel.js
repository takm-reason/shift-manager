import {observable, computed, action} from 'mobx';

export default class DateModel {
  id = Math.random();
  // javascript Dateオブジェクト
  @observable date = {};
  @observable text; // 日付の数値

  @action
  onCheckDate(sleepId, sleepDate) {
    if (new Date(sleepDate).getTime() == this.date.getTime()) {
      this.name = 'delete';
      this.value = sleepId;
    }
  }

  constructor(date) {
    this.date = date;
    this.text = date.getDate();
  }
}
