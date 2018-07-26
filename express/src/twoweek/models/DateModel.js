import {observable, computed, action} from 'mobx';

export default class DateModel {
  id = Math.random();
  // javascript Dateオブジェクト
  @observable date = {};
  @observable text; // 日付の数値
  @observable yasumi = false; // 休み

  @action
  onCheckDate(planid, date) {
    console.log(new Date(date).getTime());
    console.log(this.date.getTime());
    if (new Date(date).getTime() == this.date.getTime()) {
      this.yasumi = true;
    }
  }

  constructor(date) {
    this.date = date;
    this.text = date.getDate();
  }
}
