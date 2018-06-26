import {observable, computed, action} from 'mobx';

export default class LineModel {
  id = Math.random();
  @observable hidden;

  constructor(index) {
    this.hidden = index;
  }
}
