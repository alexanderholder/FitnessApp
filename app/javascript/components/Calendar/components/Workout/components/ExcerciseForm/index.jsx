// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Selectors from 'javascript/redux/selectors'
import * as Actions from 'javascript/redux/reducers/excercisesSlice'
import { setsRepsSchemeList, excerciseList } from './components/excercises'
import Menu from '@material-ui/icons/Menu'
import MoreVert from '@material-ui/icons/MoreVert'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import TestField from './components/TestField'

function ExcerciseForm(props) {
  const { movement, measurement_value } = props.excercise
  const [name, setName] = useState(movement || '')
  const [setsReps, setSetsReps] = useState(measurement_value || '')

  return (
    <table>
      <tbody>
        <tr>
          <td className='grabbable'>
            <MoreVert />
          </td>
          <td>
            <TestField
              boxWidth='150'
              fieldName='Sets & Reps'
            />
          </td>
          <td>
            <TestField />
          </td>
          <td>
            <IconButton onClick={() => {
              props.setShowExcerciseDetails(null)
              props.setShowExcerciseDetails(props.excerciseId)
            }}>
              <Menu/>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ExcerciseForm.propTypes = {
  excerciseId: PropTypes.number.isRequired,
  excercise: PropTypes.object.isRequired,
  setShowExcerciseDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excerciseId)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () => dispatch(Actions.removeExcercise(ownProps.excerciseId)),
  updateExcercise: (payload) => dispatch(Actions.updateExcercise(ownProps.excerciseId, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseForm)
