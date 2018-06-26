import {observable, computed, action} from 'mobx';

import DateModel from './DateModel';

// 引数の前日を返す
const yesterday = (date) => {
  return new Date(date.setDate(date.getDate() - 1));
};

// 引数の前月曜日を返す
const prevMonday = (date) => {
  if (date.getDay() == 1) {
    return date;
  }
  return prevMonday(yesterday(date));
};

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
  @observable dates = [new Date(), new Date(), new Date()];

  constructor(date) {
//    this.dates = this.dates.map(dateModel);
    this.dates = week(prevMonday(date)).map(dateModel);
  };
};
