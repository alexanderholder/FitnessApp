import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from 'NavigationBar';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <NavigationBar />,
    document.getElementById('nav')
  )
});
