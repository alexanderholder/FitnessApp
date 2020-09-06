// @flow
import React from "react";
import Calendar from "./components/calendar/Calendar";
import Sidebar from "./components/sidebar/Sidebar";
import TemplateSearch from "./components/templates/Search";

export default () => (
  <div className="app">
    <div className="side-bar">
      <Sidebar />
    </div>
    <div className="calendar">
      <TemplateSearch />
      {/* <h2>Program Calendar</h2> */}
      <Calendar />
    </div>
  </div>
);