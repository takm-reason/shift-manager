import React from 'react';
import {render} from 'react-dom';
import DevTools from 'mobx-react-devtools';

import CalendarForm from './components/CalendarForm';
import CalendarFormModel from './models/CalendarFormModel';

const store = new CalendarFormModel(new Date());

render(
  <div>
    <CalendarForm store={store} />
  </div>,
  document.getElementById('calendarform')
);

window.store = store;
