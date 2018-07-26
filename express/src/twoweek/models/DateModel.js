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

  @computed
  get backgroundColor() {
    return this.checked == (this.name == 'insert') ? '#5bc0de' : '#ffffff';
  }

  @computed
  get color() {
    return this.checked == (this.name == 'insert') ? '#ffffff' : '#000000';
  }

  constructor(date) {
    this.date = date;
    this.value = date.toLocaleString();
    this.text = date.getDate();
  }
}
