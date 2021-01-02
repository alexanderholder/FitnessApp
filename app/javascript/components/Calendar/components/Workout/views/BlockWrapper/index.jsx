// @flow
import React     from 'react'
import Redux     from 'redux'
import PropTypes from 'prop-types'

import { connect, useDispatch } from 'react-redux'
import * as Selectors           from 'javascript/redux/selectors'

import TextField   from '@material-ui/core/TextField'
import ExcerciseForm from '../../components/ExcerciseForm'

const BlockWrapper = props => {
  const dispatch = useDispatch()

  return (
    <div>
      {props.excercises.map(excercise =>
        <ExcerciseForm
          key={excercise.id}
          excercise_id={excercise.id}
          block_id={props.block_id}
        />
      )}
      <div
        className="hyperlink-button"
        onClick={() =>
          dispatch({
            type: 'excercises/excerciseAdded',
            payload: { id: props.block_id }
          })
        }
      >
        + Add Excercise
      </div>
    </div>
  )
}

BlockWrapper.propTypes = {
  workout_id: PropTypes.number.isRequired,
  block_id: PropTypes.number.isRequired,
  block: PropTypes.object.isRequired,
  excercises: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  block: Selectors.getBlockById(state, ownProps.block_id),
  excercises: Selectors.getExcercisesByBlockId(state, ownProps.block_id)
})

export default connect(mapStateToProps)(BlockWrapper)