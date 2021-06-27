import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WindowState from "windowState";
import { createProgressionTemplate } from "Calendar/redux/reducers/sessionProgressionsSlice";
import { getFavouriteWorkouts, getFavouriteBlocks } from "Calendar/redux/selectors";
import { copyBlock } from "Calendar/redux/reducers/blocksSlice";
import { saveNewProgression } from "Calendar/redux/reducers/sessionProgressionsSlice";
import DropSearch from "components/DropSearch";
import FullPageModal from "components/FullPageModal";
import ProgressionsTable from "./ProgressionsTable";
import Card from "./Card"

const DAYS_OF_THE_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function Sidebar(props) {
  const [excercise, setExcercise] = useState("")
  const [progression, setProgression] = useState("")
  const [ancorDay, setAncorDay] = useState("")
  const [open, setOpen] = useState(false)
  const [openBuilder, setOpenBuilder] = useState(false)
  const [menu, setMenu] = useState("Home")

  switch(menu) {
    case "favSessions":
    return (
      <React.Fragment>
        <button className="flex font-sans text-sm hover:text-blue-600 cursor-pointer" onClick={() => setMenu("Menu")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          <p>Back to menu</p>
        </button>
        <br/>
        <h2 className="font-sans text-lg bold">Favourite Sessions</h2>
        {props.workouts.length > 0 ? (
          props.workouts.map(workout => (
            <Card
              style={{display: "inline"}}
              key={workout.id}
              setIsShown={() => false}
              templateWorkout={true}
              workoutId={workout.id}
            />
          ))
        ) : (
          <p>No Sessions Favourited</p>
        )}
      </React.Fragment>
    )
    case "favBlocks":
    return(
      <React.Fragment>
        <button className="flex font-sans text-sm hover:text-blue-600 cursor-pointer" onClick={() => setMenu("Menu")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          <p>Back to menu</p>
        </button>
        <br/>
        <h2 className="font-sans text-lg bold">Favourite Blocks</h2>
        {props.blocks.length > 0 ? (
          props.blocks.map(block => (
            <ul
              key={block.id}
              draggable
              onDragEnd={() => props.copyBlock(block.id)}
            >
              {block.name || "unnamed block"}
            </ul>
          ))
        ) : (
          <p>No Blocks Favourited</p>
        )}
      </React.Fragment>
    )
    case "progressions":
    return (
      <React.Fragment>
        <button className="flex font-sans text-sm hover:text-blue-600 cursor-pointer" onClick={() => setMenu("Menu")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          <p>Back to menu</p>
        </button>
        <br/>
        <h2 className="font-sans text-lg bold">Progressions</h2>
        {props.progressions && props.progressions.map(progression => <ul className="font-sans text-base" key={progression.name}>{progression.name}</ul>)}
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer" onClick={() => setOpen(true)}>Add progression</ul>
        <FullPageModal
          open={open}
          setOpen={setOpen}
          title="Create Progression"
          body={<ProgressionsTable />}
          submitText="Create Progression"
          submitFunction={() => props.saveNewProgression(name, [])}
        />
      </React.Fragment>
    )
    default:
    return (
      <React.Fragment>
        <h2 className="font-sans text-lg bold dark:text-gray-200">Menu</h2>
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer dark:text-gray-200" onClick={() => setMenu("favSessions")}>Favourite Sessions</ul>
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer dark:text-gray-200" onClick={() => setMenu("favBlocks")}>Favourite Blocks</ul>
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer dark:text-gray-200">Sets and Reps</ul>
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer dark:text-gray-200">Excercise Libaray</ul>
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer dark:text-gray-200" onClick={() => setMenu("progressions")}>Progressions</ul>
        <ul className="font-sans text-base hover:text-blue-600 cursor-pointer dark:text-gray-200" onClick={() => setOpenBuilder(true)}>Quick Build</ul>
        <FullPageModal
          open={openBuilder}
          setOpen={setOpenBuilder}
          title="Program Builder"
          body={
            <React.Fragment>
              <label>Excercise</label>
              <input
                className="bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                value={excercise}
                onChange={(event) => setExcercise(event.target.value)}
              />
              <label>Progression</label>
              <DropSearch
                className="bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                datalist={props.progressions.map(progression => progression.name)}
                id="progression-search"
                onChange={(e) => setProgression(e)}
                onClick={() => setProgression("")}
                onFocus={() => setProgression("")}
                onBlur={() => setProgression()}
                value={progression}
              />
              <label>AncorDay</label>
              <DropSearch
                className="bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                datalist={DAYS_OF_THE_WEEK.map(day => day)}
                id="ancor-day-search"
                onChange={(e) => setAncorDay(e)}
                onClick={() => setAncorDay("")}
                onFocus={() => setAncorDay("")}
                onBlur={() => setAncorDay()}
                value={ancorDay}
              />
            </React.Fragment>
          }
          submitText="Autobuild Program"
          submitFunction={() => createProgression(excercise, progression, DAYS_OF_THE_WEEK.indexOf(ancorDay))}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  progressions: state.sessionProgressions,
  workouts: getFavouriteWorkouts(state),
  blocks: getFavouriteBlocks(state),
  progressions: state.sessionProgressions,
});

const mapDispatchToProps = (dispatch) => ({
  createProgression: (excercise, progression, day) => dispatch(createProgressionTemplate(excercise, progression, day)),
  copyBlock: (id) => dispatch(copyBlock(id, WindowState.hovered_card_id)),
  saveNewProgression: (name, progressions) => dispatch(saveNewProgression(name, progressions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
