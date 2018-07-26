import {observable, computed, action} from 'mobx';

import WeekModel from './WeekModel';

// 引数の前日を返す
const yesterday = (date) => {
  return new Date(date.setDate(date.getDate() - 1));
};

// 引数の月の最初の日を返す
const firstDate = (date, int = 1) => {
  return new Date(date.setDate(int));
};

// 引数の月の最後の日を返す
const lastDate = (date) => {
  return yesterday(nextMonth(firstDate(date)));
};

// 引数の指定日数後のDateを返す
const nextDate = (date, nextdate = 1) => {
  return new Date(date.setDate(date.getDate() + nextdate));
};

// 引数の1ヶ月後を返す
const nextMonth = (date) => {
  return new Date(date.setMonth(date.getMonth() + 1));
};

// 引数の1年後を返す
const nextYear = (date) => {
  return new Date(date.setFullYear(date.getFullYear() + 1));
};

// 引数の前月曜日を返す
const prevMonday = (date) => {
  if (date.getDay() == 1) {
    return date;
  }
  return prevMonday(yesterday(date));
};

// 引数の月の最初の日の前月曜日を返す
const firstMonday = (date) => {
  return prevMonday(firstDate(new Date(date)));
};

// 引数の月の最後の日の前月曜日を返す
const lastMonday = (date) => {
  return prevMonday(lastDate(new Date(date)));
};

// 引数1の配列に最後の要素の1週間後を追加して返す
const addNextDay = (date, lastDay) => {
  if (date[date.length - 1].getTime() >= lastDay.getTime()) {
    return date;
  }
  return addNextDay(
    date.concat(nextDate(new Date(date[date.length - 1]), 7)),
    lastDay
  );
};

// 引数の日のfirstMondayから一年後のlastMondayofthemonthまでの7日ごとの配列を返す
const mondays = (date) => {
  date = [prevMonday(date)].concat(nextDate(new Date(prevMonday(date)), 7));
  return date;
};

export default class TwoWeekModel {
  @observable weeks = [];
  @observable date = new Date();

  @action
  setDataCalendarform(sleepId, sleepDate) {
    this.weeks.map((week) => {
      week.onCheckDate(sleepId, sleepDate);
    });
  }

  @action
  nextMonth = () => {
    if (this.weeks[this.weeks.length - 1].hidden) {
      this.displayMonth(1);
    }
  }

  @action
  prevMonth = () => {
    if (this.weeks[0].hidden) {
      this.displayMonth(-1);
    }
  }

  @action
  displayMonth = (i) => {
    this.date = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + i,
      this.date.getDate()
    );
    this.displayMonth(this.date);
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
