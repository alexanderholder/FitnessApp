// @flow
import React, { useState }  from "react"
import Redux                from "redux"
import PropTypes            from "prop-types"
import * as Selectors       from "../../../../../../redux/selectors"

import { setsRepsSchemeList, excerciseList } from "./components/excercises"
import SearchCreate                          from './components/SearchCreate'
import Menu                                  from './components/menu/Index'

import TextField  from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { connect, useDispatch, useSelector }  from 'react-redux'

const WorkoutForm = (props) => {
  const [isWeightShown, setWeightIsShown] = useState(false)
  const [isForShown, setForIsShown] = useState(false)
  const [excerciseName, setExcerciseName] = useState(props.excercise.name)
  const dispatch = useDispatch()

  const handleChange = e => setExcerciseName(e.target.value)

  const handleKeyUp = e => {
    const trimmedText = e.target.value.trim()

    // if (trimmedText) { TODO: this will break without the trimmed text however it wont feel nice
    dispatch({
      type: 'excercises/excerciseNameChanged',
      payload: {
        id: props.excercise.id,
        name: trimmedText
      }
    })
    // }
  }

  const handleClick = () => {
    dispatch({
      type: 'excercises/excerciseRemoved',
      payload: { id: props.excercise.id }
    })
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <input
              label="Excercise Name"
              value={excerciseName}
              options={excerciseList}
              onChange={handleChange}
              onBlur={handleKeyUp}
            />
          </td>
          <td>
            <input />
          </td>
          <td>
            <input
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
              onClick={handleClick}
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
  excercise_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const excercise = Selectors.getExcerciseById(state, ownProps.excercise_id)
  return { excercise }
}

export default connect(mapStateToProps)(WorkoutForm)
