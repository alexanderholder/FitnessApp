// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Selectors from 'javascript/redux/selectors'
import { setsRepsSchemeList, excerciseList } from './components/excercises'
import TextField  from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import DeleteIcon from '@material-ui/icons/Delete'

const ExcerciseForm = props => {
  const { movement, weight_value, measurement_metric } = props.excercise
  const [isWeightShown, setWeightIsShown] = useState(weight_value)

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
          <td>
            <TextField
              label="Sets & Reps"
              onChange={e => props.updateMeasurement(e.target.value)}
              options={setsRepsSchemeList}
              size="small"
              variant="outlined"
              value={measurement_metric}
              width="50"
            />
          </td>
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
          <td>
            <IconButton
              onClick={() => { setWeightIsShown(!isWeightShown) }}
            >
              <FitnessCenterIcon/>
            </IconButton>
          </td>
          <td>
            <IconButton
              onClick={props.removeExcercise}
            >
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
