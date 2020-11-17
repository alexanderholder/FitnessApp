// @flow
import React from "react";
import Calendar from "./components/calendar/Index";
import Sidebar from "./components/sidebar/Index";
import TemplateSearch from "./components/templates/Index";
import Navbar from "./components/navbar/Index";

export default () => (
  <div className="app">
    <div className="float-right">
      <Navbar />
    </div>
    <div className="side-bar">
      <Sidebar />
    </div>
    <div className="calendar">
      <TemplateSearch />
      {/* <h2>Program Calendar</h2> TODO confirm can remove this in favour of searchbar */}
      <Calendar />
    </div>
  </div>
);
