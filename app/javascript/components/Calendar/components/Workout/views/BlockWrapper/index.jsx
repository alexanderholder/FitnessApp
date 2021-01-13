// @flow
import React from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import { saveNewExcercise } from 'javascript/redux/reducers/excercisesSlice'
import TextField from '@material-ui/core/TextField'
import ExcerciseForm from '../../components/ExcerciseForm'

const BlockWrapper = props => {
  return (
    <div
      className="block-wrapper"
      style={{
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
        marginBottom: '10px'
      }}
    >
      {props.excercises.map(excercise =>
        <ExcerciseForm
          key={excercise.id}
          excercise_id={excercise.id}
          block_id={props.block_id}
        />
      )}
      <div
        className="hyperlink-button"
        onClick={props.addExcercise}
      >
        + Add Excercise
      </div>
    </div>
  )
}

BlockWrapper.propTypes = {
  block: PropTypes.object.isRequired,
  block_id: PropTypes.number.isRequired,
  excercises: PropTypes.array.isRequired,
  workout_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  block: Selectors.getBlockById(state, ownProps.block_id),
  excercises: Selectors.getExcercisesByBlockId(state, ownProps.block_id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addExcercise: () => dispatch(saveNewExcercise({ movement: "", block_id: ownProps.block_id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockWrapper)
