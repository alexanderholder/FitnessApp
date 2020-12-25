// @flow
import React, { useState }  from 'react'
import Redux                from 'redux'
import PropTypes            from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import * as Selectors from '../../../../../../redux/selectors'

import { setsRepsSchemeList, excerciseList } from './components/excercises'
import SearchCreate                          from './components/SearchCreate'
import Menu                                  from './components/menu/Index'

import TextField  from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const WorkoutForm = props => {
  const [isWeightShown, setWeightIsShown] = useState(props.excercise.weight_value)
  const [isForShown, setForIsShown]       = useState(props.excercise.mesurement_value)

  const [movement, setMovement]     = useState(props.excercise.movement)
  const [setsReps, setSetsReps]     = useState(props.excercise.sets_reps)
  const [weight, setWeight]         = useState(props.excercise.weight)
  const [mesurement, setMesurement] = useState(props.excercise.mesurement_value)

  const dispatch = useDispatch()

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
            <TextField
              label="Excercise Name"
              // placeholder="Excercise Name"
              value={movement}
              // options={excerciseList}
              variant="outlined"
              size="small"
              width="50"
              onChange={e => setMovement(e.target.value)}
              onKeyUp={e => {
                dispatch({
                  type: 'excercises/excerciseMovementChanged',
                  payload: {
                    id: props.excercise.id,
                    movement: e.target.value.trim()
                  }
                })
              }}
            />
          </td>
          <td>
            <TextField
              label="Sets & Reps"
              // placeholder="Sets & Reps"
              value={setsReps}
              // options={setsRepsSchemeList}
              variant="outlined"
              size="small"
              width="50"
              onChange={e => setSetsReps(e.target.value)}
              // onKeyUp={e => {
              //   dispatch({
              //     type: 'excercises/excerciseSetsRepsChanged',
              //     payload: {
              //       id: props.excercise.id,
              //       sets_reps: e.target.value.trim()
              //     }
              //   })
              // }}
            />
          </td>
          { isWeightShown && (
            <td>
              <TextField
                label="Weight"
                // placeholder="Weight"
                variant="outlined"
                size="small"
                width="50"
                value={weight}
                onKeyUp={e => {
                  dispatch({
                    type: 'excercises/excerciseWeightChanged',
                    payload: {
                      id: props.excercise.id,
                      weight: e.target.value.trim()
                    }
                  })
                }}
              />
            </td>
          )}
          { isForShown && (
            <td>
              <TextField
                label="For Mesurement"
                variant="outlined"
                size="small"
                width="50"
                value={mesurement}
                onKeyUp={e => {
                  dispatch({
                    type: 'excercises/excerciseMesurementChanged',
                    payload: {
                      id: props.excercise.id,
                      for: e.target.value.trim()
                    }
                  })
                }}
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
            <IconButton onClick={handleClick} >
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
  excercise: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excercise_id)
})

export default connect(mapStateToProps)(WorkoutForm)
