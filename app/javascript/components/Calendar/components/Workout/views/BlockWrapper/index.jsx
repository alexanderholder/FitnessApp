// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import { saveNewExcercise } from 'javascript/redux/reducers/excercisesSlice'
import ExcerciseForm from '../../components/ExcerciseForm'
// import RepeatIcon from '@material-ui/icons/Repeat'
// import IconButton from '@material-ui/core/IconButton'
// import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'

const BlockWrapper = props => {
  // const [showBlockDetails, setShowBlockDetails] = useState(false)
  const [name, setName] = useState("")
  const [rounds, setRounds] = useState("")

  return (
    // <React.Fragment>
    //   {/* <Tooltip title="Add Block Details">
    //     <IconButton
    //       onClick={setShowBlockDetails(!showBlockDetails)}
    //       style={{ float: 'right' }}
    //     >
    //       <RepeatIcon />
    //     </IconButton>
    //   </Tooltip> */}
    <div className="block-wrapper">
      <div style={{ paddingBottom: "10px"}}>
        <TextField
          autoFocus={true}
          label="Block Name"
          // onBlur={() => props.updateExcercise({ movement: name })}
          onChange={e => setName(e.target.value)}
          size="small"
          // variant="outlined"
          value={name}
          width="50"
        />
        <TextField
          autoFocus={true}
          label="Block Rounds"
          // onBlur={() => props.updateExcercise({ movement: name })}
          onChange={e => setRounds(e.target.value)}
          size="small"
          // variant="outlined"
          value={rounds}
          width="50"
        />
      </div>
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
    // </React.Fragment>
  )
}

BlockWrapper.propTypes = {
  block: PropTypes.object.isRequired,
  block_id: PropTypes.number.isRequired,
  excercises: PropTypes.array.isRequired,
  workout_id: PropTypes.number.isRequired,
  block_count: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  block_count: Selectors.getBlocksByWorkoutId(state, ownProps.workout_id).count,
  block: Selectors.getBlockById(state, ownProps.block_id),
  excercises: Selectors.getExcercisesByBlockId(state, ownProps.block_id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addExcercise: () => dispatch(saveNewExcercise({ movement: "", block_id: ownProps.block_id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockWrapper)
