import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'Calendar/redux/store';
import Calendar from 'Calendar';
import 'stylesheets/application.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Calendar />
    </Provider>,
    document.getElementById('root')
  )
});
