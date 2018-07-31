import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Week from './Week';

@observer
class ShiftForm extends React.Component {
  render() {
    return (
      <form action="/" method="POST">
        <div className="table-responsive">
          <table className="table table-bordered" style={{
            tableLayout: 'fixed'}}>
            <thead>
              <tr>
                <th
                  className="text-center"
                  colSpan="3"
                ></th>
                <th
                  className="text-center"
                  colSpan="2"
                >-8</th>
                <th
                  className="text-center"
                  colSpan="5"
                >8~13</th>
                <th
                  className="text-center"
                  colSpan="4"
                >13~17</th>
                <th
                  className="text-center"
                  colSpan="5"
                >17~22</th>
                <th
                  className="text-center"
                  colSpan="2"
                >22-</th>
              </tr>
            </thead>
            <Week week={this.props.store.week} />
          </table>
          <div className="text-right">
            <button
              className="btn btn-success"
              type="submit">
              Save
          </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ShiftForm;
