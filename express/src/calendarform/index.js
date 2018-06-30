import React from 'react';
import {render} from 'react-dom';
import DevTools from 'mobx-react-devtools';

import CalendarForm from './components/CalendarForm';
import CalendarFormModel from './models/CalendarFormModel';

const calendarform = new CalendarFormModel(new Date());

render(
  <div>
    <CalendarForm calendarform={calendarform} />
  </div>,
  document.getElementById('calendarform')
);

window.calendarform = calendarform;
