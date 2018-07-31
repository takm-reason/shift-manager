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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th
                  className="text-center"
                  colSpan="3"
                  style={{
                    minWidth: '75px',
                  }}
                ></th>
                <th
                  className="text-center"
                  colSpan="2"
                  style={{
                    minWidth: '50px',
                  }}
                >-8</th>
                <th
                  className="text-center"
                  colSpan="5"
                  style={{
                    minWidth: '125px',
                  }}
                >8~13</th>
                <th
                  className="text-center"
                  colSpan="4"
                  style={{
                    minWidth: '100px',
                  }}
                >13~17</th>
                <th
                  className="text-center"
                  colSpan="5"
                  style={{
                    minWidth: '125px',
                  }}
                >17~22</th>
                <th
                  className="text-center"
                  colSpan="2"
                  style={{
                    minWidth: '50px',
                  }}
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
