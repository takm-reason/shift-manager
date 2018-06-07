import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Date = observer(({date}) => (
  <td className="text-center">
    <input
      className="sr-only"
      type="checkbox"
      name={date.name}
      value={date.value}
      checked={date.checked}
      onClick={() => (date.checked = !date.checked)}
    />
    <button
      className={'btn ' + date.name}
      type="button"
      onClick={() => (date.checked = !date.checked)}
    >
      {date.text}
    </button>
  </td>
));

export default Date;
