import {observable, computed, action} from 'mobx';

export default class LineModel {
  id = Math.random();
  @observable date;
  @observable hidden;
  @observable array;

  constructor(date, index, array) {
    this.date = date;
    this.hidden = index;
    this.array = array;
  }
}
