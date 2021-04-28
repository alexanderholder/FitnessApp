import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleAccordion from './components/Accordion';
import Modal from './components/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createProgressionTemplate } from 'javascript/redux/reducers/sessionProgressionsSlice';

const daysOfTheWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function Sidebar({progressions, createProgression}) {
  const [excercise, setExcercise] = React.useState('')
  const [progression, setProgression] = React.useState('')
  const [ancorDay, setAncorDay] = React.useState('')

  return (
    <>
      <Modal
        buttonName="Program Builder"
        // buttonStyle={{}} TODO
        modalName="Quick Builder"
        textBody="Quickly build a program using an excercise and a progression template."
        textBodyTwo={
          <div style={{ textAlign: 'center' }} >
            <TextField
              label="Excercise"
              style={{ boder: 5, paddingRight: 5, }}
              value={excercise}
              onChange={(event) => setExcercise(event.target.value)}
            />
            <Select
              labelId="Progression"
              id="Progression-select"
              style={{ minWidth: 120, marginTop: 16, marginLeft: 5, }}
              value={progression}
              onChange={(event) => setProgression(event.target.value)}
            >
              {progressions && progressions.map(progression =>
                <MenuItem key={progression.id} value={progression.id}>{progression.name}</MenuItem>
              )}
            </Select>
            <Select
              labelId="AncorDay"
              id="AncorDay-select"
              style={{ minWidth: 120, marginTop: 16, marginLeft: 5, }}
              value={ancorDay}
              onChange={(event) => setAncorDay(event.target.value)}
            >
              {daysOfTheWeek.map((day) =>
                <MenuItem key={day} value={day}>{day}</MenuItem>
              )}
            </Select>
          </div>
        }
        saveName="Create"
        submitFunction={() => createProgression(excercise, progression, daysOfTheWeek.indexOf(ancorDay))}
      />
      <SimpleAccordion />
    </>
  );
}

App.propTypes = {
  progressions: PropTypes.array,
}

const mapStateToProps = (state) => ({
  progressions: state.sessionProgressions,
});

const mapDispatchToProps = (dispatch) => ({
  createProgression: (excercise, progression, day) => dispatch(createProgressionTemplate(excercise, progression, day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
