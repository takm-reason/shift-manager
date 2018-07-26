import {observable, computed, action} from 'mobx';

export default class DateModel {
  id = Math.random();
  // javascript Dateオブジェクト
  @observable date = {};
  @observable text; // 日付の数値
  @observable yasumi = false; // 休み

  @action
  onCheckDate(planid, plandate) {
    console.log(plandate);
    console.log(new Date(plandate).getTime());
    console.log(this.date.getTime());
    if (new Date(plandate).getTime() == this.date.getTime()) {
      this.yasumi = true;
    }
  }

  constructor(date) {
    this.date = date;
    this.text = date.getDate();
  }
}
