import React from "react";
import Button from "./components/Button"
import SimpleAccordion from "./components/Accordion"

export default () => (
  <div>
    <div>
      {/* Bulk adds a program */}
      <Button text={"+ New Program"}/>
      <br/>
    </div>
    <SimpleAccordion />
  </div>
)