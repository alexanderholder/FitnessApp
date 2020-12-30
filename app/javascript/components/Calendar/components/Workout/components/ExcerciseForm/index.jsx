// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Selectors from '../../../../../../redux/selectors'
import { setsRepsSchemeList, excerciseList } from './components/excercises'
// import SearchCreate from './components/SearchCreate'
import Menu from './components/menu'
import TextField  from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const ExcerciseForm = props => {
  const { movement, weight_value, measurement_metric } = props.excercise
  const [isWeightShown, setWeightIsShown] = useState(weight_value)
  const [isForShown, setForIsShown] = useState(measurement_metric)

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <TextField
              autoFocus={true}
              label="Excercise Name"
              onChange={e => props.updateMovement(e.target.value)}
              options={excerciseList}
              size="small"
              variant="outlined"
              value={movement}
              width="50"
            />
          </td>
          {/* <td>
            <TextField
              label="Sets & Reps"
              value={setsReps}
              options={setsRepsSchemeList}
              variant="outlined"
              size="small"
              width="50"
              onChange={e => setSetsReps(e.target.value)}
              //     type: 'excercises/excerciseSetsRepsChanged',
              //     payload: {
              //       id: props.excercise.id,
              //       sets_reps: e.target.value
            />
          </td> */}
          { isWeightShown && (
            <td>
              <TextField
                label="Weight"
                onChange={e => props.updateWeight(e.target.value)}
                size="small"
                variant="outlined"
                value={weight_value}
                width="50"
              />
            </td>
          )}
          { isForShown && (
            <td>
              <TextField
                label="For Measurement"
                onChange={e => props.updateMeasurement(e.target.value)}
                size="small"
                variant="outlined"
                value={measurement_metric}
                width="50"
              />
            </td>
          )}
          <td>
            <Menu
              isWeightShown={isWeightShown}
              setWeightIsShown={setWeightIsShown}
              isForShown={isForShown}
              setForIsShown={setForIsShown}
            />
          </td>
          <td>
            <IconButton onClick={props.removeExcercise} >
              <DeleteIcon/>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ExcerciseForm.propTypes = {
  excercise_id: PropTypes.number.isRequired,
  excercise: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excercise_id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () => dispatch({ type: 'excercises/excerciseRemoved', payload: ownProps.excercise_id }),
  updateMovement: (movement) => dispatch({ type: 'excercises/excerciseMovementChanged', payload: { id: ownProps.excercise_id, movement: movement } }),
  updateWeight: (weight) => dispatch({ type: 'excercises/excerciseWeightChanged', payload: { id: ownProps.excercise_id, weight_value: weight } }),
  updateMeasurement: (measurement) => dispatch({ type: 'excercises/excerciseMeasurementChanged', payload: { id: ownProps.excercise_id, measurement_metric: measurement } })
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseForm)
