// @flow
import React from "react";
import Calendar from "./components/calendar/Calendar";
import Sidebar from "./components/sidebar/Sidebar";

export default () => (
  <div className="app">
    <div className="side-bar">
      <Sidebar />
    </div>
    <div className="calendar">
      <h2>Program Calendar</h2>
      <Calendar />
    </div>
  </div>
);