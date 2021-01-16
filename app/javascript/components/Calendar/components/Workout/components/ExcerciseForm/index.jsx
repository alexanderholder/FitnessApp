// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Selectors from 'javascript/redux/selectors'
import * as Actions from 'javascript/redux/reducers/excercisesSlice'
import { setsRepsSchemeList, excerciseList } from './components/excercises'
import TextField  from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const ExcerciseForm = props => {
  const { movement, weight_value, measurement_metric } = props.excercise
  const [isWeightShown, setWeightIsShown] = useState(weight_value)
  const [name, setName] = useState(movement)
  const [setsReps, setSetsReps] = useState(measurement_metric)
  const [weight, setWeight] = useState(weight_value)

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <TextField
              autoFocus={true}
              label="Excercise Name"
              onBlur={() => props.updateExcercise({ movement: name })}
              onChange={e => setName(e.target.value)}
              options={excerciseList}
              size="small"
              variant="outlined"
              value={name}
              width="50"
            />
          </td>
          <td>
            <TextField
              label="Sets & Reps"
              onBlur={() => props.updateExcercise({ measurement_metric: setsReps })}
              onChange={e => setSetsReps(e.target.value)}
              options={setsRepsSchemeList}
              size="small"
              variant="outlined"
              value={setsReps}
              width="50"
            />
          </td>
          { isWeightShown && (
            <td>
              <TextField
                label="Weight"
                onBlur={() => props.updateExcercise({ weight_value: weight })}
                onChange={e => setWeight(e.target.value)}
                size="small"
                variant="outlined"
                value={weight}
                width="50"
              />
            </td>
          )}
          <td>
            <Tooltip title="Add weight">
              <IconButton
                onClick={() => { setWeightIsShown(!isWeightShown) }}
              >
                <FitnessCenterIcon/>
              </IconButton>
            </Tooltip>
          </td>
          <td>
            <Tooltip title="Delete excercise">
              <IconButton
                onClick={props.removeExcercise}
              >
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
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
  removeExcercise: () => dispatch(Actions.removeExcercise(ownProps.excercise_id)),
  updateExcercise: (payload) => dispatch(Actions.updateExcercise(ownProps.excercise_id, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseForm)
