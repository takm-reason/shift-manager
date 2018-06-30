import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Date = observer(({date}) => (
  <td
    onClick={() => (date.checked = !date.checked)}
    style={{
      textAlign: 'center',
      verticalAlign: 'middle',
      backgroundColor: date.backgroundColor,
      color: date.color,
      height: '80px',
    }}
  >
    <input
      className="sr-only"
      type="checkbox"
      name={date.name}
      value={date.value}
      checked={date.checked}
    />
    {date.text}
  </td>
));

export default Date;
