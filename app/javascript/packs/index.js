import React    from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from '../serviceWorker';
import ErrorBoundary from '../errorBoundry';
import store from '../redux/store';
import App from '../App';
import "../stylesheets/application"; // Tailwind CSS

const renderApp = () => {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      // <React.StrictMode>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
          </Provider>
        </ErrorBoundary>,
      // </React.StrictMode>,
      document.getElementById('root')
    )
  });
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
