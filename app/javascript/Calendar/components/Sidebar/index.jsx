import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleAccordion from './components/Accordion';
import Modal from './components/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createProgressionTemplate } from '../../redux/reducers/sessionProgressionsSlice';
// import Modalv2 from './components/Modalv2';
import FullPageModal from './components/FullPageModal';
import ProgressionsTable from './components/ProgressionsTable';

const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Sidebar({ progressions, createProgression, saveNewProgression }) {
  const [excercise, setExcercise] = useState('')
  const [progression, setProgression] = useState('')
  const [ancorDay, setAncorDay] = useState('')
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState('Home')

      {/* <Modal
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
      /> */}


      {/* <SimpleAccordion /> */}

      {/* <Modal
        buttonName="Create Progression"
        modalName="Create Progression"
        textBody="Add you're sets and reps progressions to autobuild you're session progressions."
        textBodyTwo={
          <div style={{ textAlign: 'center' }} >
            <TextField
              label="Progression Name"
              style={{ boder: 5, paddingRight: 5, }}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label="Progression sets and reps"
              style={{ border: 5, }}
              onChange={(event) => setProgressions(event.target.value)}
            />
          </div>
        }
        saveName="Create"
        submitFunction={() => saveNewProgression(name, progressions.split(','))}
      /> */}

  switch(menu) {
    case "Progressions":
    return (
      <React.Fragment>
        <div className='flex font-sans text-sm hover:text-blue-600 cursor-pointer' onClick={() => setMenu('Menu')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          <p>Back to menu</p>
        </div>
        <br/>
        {progressions ? progressions.map(progression =>
          <p className="font-sans text-base" key={progression.name}>{progression.name}<br/></p>) : (<></>)
        }
      </React.Fragment>
    )
    default:
    return (
      <React.Fragment>
        <h2 className="font-sans text-lg bold">Menu</h2>
        <p className="font-sans text-base hover:text-blue-600 cursor-pointer">Favourite Sessions</p>
        <p className="font-sans text-base hover:text-blue-600 cursor-pointer">Favourite Blocks</p>
        <p className="font-sans text-base hover:text-blue-600 cursor-pointer">Sets and Reps</p>
        <p className="font-sans text-base hover:text-blue-600 cursor-pointer">Excercise Libaray</p>
        <p className="font-sans text-base hover:text-blue-600 cursor-pointer" onClick={() => setMenu("Progressions")}>Progressions</p>
        {/* onClick={() => setOpen(true)} */}
        <FullPageModal
          open={open}
          setOpen={setOpen}
          title='Create Progression'
          body={<ProgressionsTable />}
          submitText='Create Progression'
        />
      </React.Fragment>
    )
  }
}

Sidebar.propTypes = {
  progressions: PropTypes.array,
}

const mapStateToProps = (state) => ({
  progressions: state.sessionProgressions,
});

const mapDispatchToProps = (dispatch) => ({
  createProgression: (excercise, progression, day) => dispatch(createProgressionTemplate(excercise, progression, day)),
  saveNewProgression: (name, progressions) => dispatch(saveNewProgression(name, progressions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
