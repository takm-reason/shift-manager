import {observable, computed, action} from 'mobx';

import DateModel from './DateModel';

// 引数の指定日数後のDateを返す
const nextDate = (date, nextdate = 1) => {
  return new Date(date.setDate(date.getDate() + nextdate));
};

// 引数1の配列に最後の要素の1日後を追加して返す
const addNextDate = (date, lastDay) => {
  if (date.length >= 7) {
    return date;
  }
  return addNextDate(
    date.concat(nextDate(new Date(date[date.length - 1]))),
    lastDay
  );
};

// 引数の日から7日間を配列で返す
const week = (date) => {
  return addNextDate([date], nextDate(new Date(date)), 7);
};

const dateModel = (date) => {
  return new DateModel(date);
};

export default class WeekModel {
  id = Math.random();
  @observable dates = [];
  @observable hidden = true;

  @computed
  get insertCount() {
    return this.dates.filter(
      (date) => date.name == 'insert' && date.checked).length;
  }

  @computed
  get deleteCount() {
    return this.dates.filter(
      (date) => date.name == 'delete' && date.checked).length;
  }

  @action
  onCheckDate(sleepId, sleepDate) {
    this.dates.map((date) => {
      date.onCheckDate(sleepId, sleepDate);
    });
  }

  @action
  displayMonth(date) {
    if (
      (
        this.dates[0].date.getMonth() == date.getMonth() &&
        this.dates[0].date.getFullYear() == date.getFullYear()
      ) ||
      (
        this.dates[6].date.getMonth() == date.getMonth() &&
        this.dates[6].date.getFullYear() == date.getFullYear()
      )
    ) {
      this.hidden = false;
    } else {
      this.hidden = true;
    };
  }

  constructor(date) {
    this.dates = week(date).map(dateModel);
  }
}
