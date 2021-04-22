import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleAccordion from './components/Accordion';
import Modal from './components/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Sidebar({progressions, createProgression}) {
  const [progression, setProgression] = React.useState('')

  return (
    <>
      <Modal
        buttonName="Program Builder"
        // buttonStyle={{}} TODO
        modalName="Quick Builder"
        textBody="Quickly build a program using a excercise and a progression template."
        textBodyTwo={
          <div style={{ textAlign: 'center' }} >
            <TextField
              label="Excercise"
              style={{ boder: 5, paddingRight: 5, }}
            />
            <Select
              labelId="Progression"
              id="Progression-select"
              style={{ minWidth: 120, marginTop: 16, marginLeft: 5, }}
              value={progression}
              onChange={(event) => setProgression(event.target.value)}
            >
              {progressions && progressions.map(progression =>
                <MenuItem key={progression.id} value={progression.id}>{progression.name}</MenuItem>)
              }
            </Select>
          </div>
        }
        saveName="Create"
        submitFunction={() => createProgression({name: name, progressions: progressions})}
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
  createProgression: (workouts) => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
