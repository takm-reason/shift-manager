import React from 'react';
import {render} from 'react-dom';
import DevTools from 'mobx-react-devtools';

import TwoWeek from './components/TwoWeek';
import TwoWeekModel from './models/TwoWeekModel';

const store = new TwoWeekModel(new Date());

render(
  <div>
    <TwoWeek store={store} />
  </div>,
  document.getElementById('twoweek')
);

window.store = store;
