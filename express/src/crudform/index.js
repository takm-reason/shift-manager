import React from 'react';
import {render} from 'react-dom';
import DevTools from 'mobx-react-devtools';

import CrudForm from './components/CrudForm';
import CrudFormModel from './models/CrudFormModel';

const crudform = new CrudFormModel();

render(
  <div>
    <crudform crudform={crudform} />
  </div>,
  document.getElementById('crudform')
);

window.crudform = crudform;
