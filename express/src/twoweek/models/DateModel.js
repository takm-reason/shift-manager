import {observable, computed, action} from 'mobx';

export default class DateModel {
  id = Math.random();
  // javascript Dateオブジェクト
  @observable date = {};
  @observable text; // 日付の数値
  @observable yasumi = false; // 休み
  @observable color = '#ffffff';

  @action
  onCheckDate(planid, plandate) {
    if (new Date(plandate).getTime() == this.date.getTime()) {
      this.yasumi = true;
    }
  }

  constructor(date) {
    this.date = date;
    this.text = date.getDate();
    if (this.text == new Date().getDate()) {
      this.color = '#ffff00';
    }
  }
}
