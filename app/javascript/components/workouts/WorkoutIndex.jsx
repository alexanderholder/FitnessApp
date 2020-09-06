import React from "react";
import SimplePopover from "../excercise/Excercise"

export default class NewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      clicked: !state.clicked
    }));
  }

  render() {
    return (
      <div class="hyperlink-button" onClick={this.handleClick}>
        {/* {this.state.clicked ? "creating..." : "+ New Workout"} */}
        <SimplePopover />
      </div>
    )
  }
}