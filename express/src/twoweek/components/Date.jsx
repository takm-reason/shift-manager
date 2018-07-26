import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Date = observer(({date}) => (
  <td className="text-muted p-1">
    <div>
      <p className="m-0" style={{float: 'left'}}>{date.text}</p>
      {
        date.yasumi
        ? <p className="m-0 text-right">休</p>
        : <p className="m-0 text-right" style={{visibility: 'hidden'}}>休</p>
      }
    </div>
    <div className="text-center">17:00</div>
    <div className="text-center">22:00</div>
  </td>
));

export default Date;
