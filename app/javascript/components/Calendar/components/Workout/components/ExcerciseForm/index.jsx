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
import IconButton from '@material-ui/core/IconButton'
import TextField from './components/TextField'

function ExcerciseForm(props) {
  const [name, setName] = useState(props.excercise.movement || '')
  const [setsReps, setSetsReps] = useState(props.excercise.measurement_value || '')
  const updateName = () => props.updateExcercise({ movement: name })
  const updateSetsReps = () => props.updateExcercise({ measurement_value: setsReps })

  return (
    <div style={{ display: 'flex', paddingTop: 5 }}>
      <div className='grabbable'><MoreVert /></div>
      <TextField
        style={{width: 250, textOverlow:'none' }}
        fieldName='Excercise'
        listOptions={excerciseList}
        updateText={setName}
        value={name}
        updateServer={updateName}
      />
      <TextField
        style={{width: 150, textOverlow:'none' }}
        fieldName='Sets & Reps'
        listOptions={setsRepsSchemeList}
        updateText={setSetsReps}
        value={setsReps}
        updateServer={updateSetsReps}
      />
      <IconButton onClick={() => {
        props.setShowExcerciseDetails(null) // TODO LMAO
        props.setShowExcerciseDetails(props.excerciseId)
      }}><Menu/></IconButton>
    </div>
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
