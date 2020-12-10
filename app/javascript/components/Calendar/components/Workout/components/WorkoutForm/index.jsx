// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import { connect }          from "react-redux"
import * as Selectors       from "../../../../selectors"

import { setsRepsSchemeList, excerciseList } from "./components/excercises"

import SearchCreate from './components/SearchCreate'
import Menu         from './components/menu/Index'

import TextField  from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { useActions }       from "../../../../../../hooks"
import { workoutsActions } from "../../../../../../state/ducks/workouts"

const WorkoutForm = (props) => {
  const [isWeightShown, setWeightIsShown] = useState(false)
  const [isForShown, setForIsShown] = useState(false)
  const [excercise, setExcercise] = useState("")
  const { removeExcercise } = useActions(workoutsActions)

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <SearchCreate
              label="Excercise Name"
              value={excercise}
              options={excerciseList}
            />
          </td>
          <td>
            <input
              onChange={e => setExcercise(e.target.value)}
              // onBlur={() => SendExcercise(excercise)}
            />
          </td>
          <td>
            <SearchCreate
              label="Sets & Reps"
              options={setsRepsSchemeList}
            />
          </td>
          {isWeightShown && (
            <td>
              <TextField
                id="standard-basic"
                label="Weight"
                variant="outlined"
                size="small"
                width="50"
              />
            </td>
          )}
          {isForShown && (
            <td>
              <TextField
                id="standard-basic"
                label="For"
                variant="outlined"
                size="small"
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
            <IconButton
              aria-label="delete"
              onClick={() => removeExcercise(props.excercise)}
            >
              <DeleteIcon/>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

WorkoutForm.propTypes = {
  excercise_id: PropTypes.number.isRequired,
  workout_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const workout = Selectors.getWorkoutById(state, ownProps.workout_id)
  const excercise = Selectors.getExcerciseById(state, ownProps.workout_id, ownProps.excercise_id)
  return { workout, excercise }
}

export default connect(mapStateToProps)(WorkoutForm)
