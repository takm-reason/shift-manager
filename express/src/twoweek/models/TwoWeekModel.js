import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

// 引数の前日を返す
const yesterday = (date) => {
  return new Date(date.setDate(date.getDate() - 1));
};

// 引数の指定日数後のDateを返す
const nextDate = (date, nextdate = 1) => {
  return new Date(date.setDate(date.getDate() + nextdate));
};

// 引数の前月曜日を返す
const prevMonday = (date) => {
  if (date.getDay() == 1) {
    return date;
  }
  return prevMonday(yesterday(date));
};

// 引数の日の前月曜日とその次の月曜日を返す
const mondays = (date) => {
  date = [prevMonday(date)].concat(nextDate(new Date(prevMonday(date)), 7));
  return date;
};

export default class TwoWeekModel {
  @observable weeks = [];
  @observable date = new Date();

  @action
  setDataTwoWeek(planid, date) {
    this.weeks.map((week) => {
      week.onCheckDate(planid, date);
    });
  }

  constructor() {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    this.weeks = mondays(this.date).map((monday) => {
      return new WeekModel(monday);
    });
  }
}
