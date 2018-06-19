import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Date = observer(({date}) => (
  <td
    className="text-center"
    onClick={() => (date.checked = !date.checked)}
    style={{
      backgroundColor: date.backgroundColor,
      color: date.color,
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
