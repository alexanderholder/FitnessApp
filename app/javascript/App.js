// @flow
import React            from "react"
import { render }       from "react-dom"
import { Provider }     from 'react-redux'
import { createStore }  from 'redux'

import ErrorBoundary    from "./errorBoundry"
import configureStore   from "./redux/store"

import { Calendar, Navbar, Sidebar, TemplateSearch } from "./components"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

function App() {
  const store = configureStore

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="app">
          <div className="float-right">
            <Navbar />
          </div>
          <div className="side-bar">
            <Sidebar />
          </div>
          <div className="calendar">
            <TemplateSearch />
            <Calendar />
          </div>
        </div>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
