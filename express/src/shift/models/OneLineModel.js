import {observable, computed, action} from 'mobx';

export default class OneLineModel {
  id = Math.random();
  @observable hidden;

  constructor(index) {
    this.hidden = index;
  }
}
