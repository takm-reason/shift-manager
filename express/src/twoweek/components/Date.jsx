import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Date = observer(({date}) => (
  <td className="text-muted p-1" style={{
    backgroundColor: date.color,
  }}>{date.text}
      {
        date.yasumi
        ? <div className="text-center">休</div>
        : <div>
            <div className="text-center">17:00</div>
            <div className="text-center">22:00</div>
          </div>
      }
  </td>
));

export default Date;
