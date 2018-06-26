import React from 'react';
import {render} from 'react-dom';
import DevTools from 'mobx-react-devtools';

import ShiftForm from './components/ShiftForm';
import ShiftFormModel from './models/ShiftFormModel';

const store = new ShiftFormModel(new Date());

render(
  <div>
    <ShiftForm store={store} />
  </div>,
  document.getElementById('shift')
);

window.store = store;
