// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
import { updateExcercise, removeExcercise } from 'javascript/redux/reducers/excercisesSlice'
import * as Selectors from 'javascript/redux/selectors'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

// import React from 'react';
// import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
// import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
// import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
// import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
// import Grid from '@material-ui/core/Grid';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// export default function ToggleButtonSizes() {
//   const [alignment, setAlignment] = React.useState('left');

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };
{/* <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleChange}>
  <ToggleButton value="left">
    <FormatAlignLeftIcon fontSize="small" />
  </ToggleButton>
  <ToggleButton value="center">
    <FormatAlignCenterIcon fontSize="small" />
  </ToggleButton>
  <ToggleButton value="right">
    <FormatAlignRightIcon fontSize="small" />
  </ToggleButton>
  <ToggleButton value="justify">
    <FormatAlignJustifyIcon fontSize="small" />
  </ToggleButton>
</ToggleButtonGroup> */}

function ExcerciseDetails(props) {
  const [measurement, setMeasurement] = useState(props.excercise.measurement_value)
  const [weight, setWeight] = useState(props.excercise.weight_value)

  return (
    <div
      key={`excercise-popover-${props.excerciseId}`}
      style={{
        marginLeft: '20px',
        boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
        display: 'inline-block',
        cursor: 'default',
        position: 'fixed',
        backgroundColor: 'white'
      }}
    >
      <List style={{padding: '15px'}}>
        <div
          style={{
            fontSize: '1rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: '400',
            lineHeight: '1.5',
            letterSpacing: '0.00938em',
          }}
        >
          {props.excercise.movement}
          <Tooltip title='Delete Excercise'>
            <IconButton onClick={() => {
              props.setShowExcerciseDetails(null)
              props.removeExcercise()
            }}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title='Close Window'>
            <IconButton
              style={{float: 'right'}}
              onClick={() => props.setShowExcerciseDetails(null)}
            >
              <CloseIcon/>
            </IconButton>
          </Tooltip>
        </div>
        <ListItemText key={`excercise-details-list-${props.excerciseId}-weight`} primary={
          <TextField
            key='weight-text-box'
            label='Weight'
            margin="dense"
            type="text"
            onChange={e => {
              setWeight(e.target.value)
              props.updateExcercise(props.excerciseId, { weight_value: e.target.value})
            }}
            value={weight}
          />
        }/>
        <ListItemText key={`excercise-details-list-${props.excerciseId}-measurement`} primary={
          <TextField
            key='measurement-text-box'
            label='Sets & Reps'
            margin="dense"
            type="text"
            onChange={e => {
              setMeasurement(e.target.value)
              props.updateExcercise(props.excerciseId, { measurement_value: e.target.value})
            }}
            value={measurement}
          />
        }/>
      </List>
    </div>
  )
}

ExcerciseDetails.propTypes = {
  excerciseId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excerciseId),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () => dispatch(removeExcercise(ownProps.excerciseId)),
  updateExcercise: (id, payload) => dispatch(updateExcercise(id, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseDetails)
