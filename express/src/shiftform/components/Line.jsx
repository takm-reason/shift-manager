import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Line = observer(({date}) => (
  <tr>
    <td colSpan='3'
      rowSpan={date.array}
      hidden={date.hidden}
    >
      {date.date.getDate()}日
    </td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0'></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
    <td className='p-0' style={{backgroundColor: '#eeeeee'}}></td>
  </tr>
));

export default Line;
