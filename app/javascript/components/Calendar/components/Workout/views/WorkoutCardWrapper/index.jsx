// @flow
import React from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import WorkoutCard from '../../components/WorkoutCard'

const WorkoutCardWrapper = (props) => {
  if (props.workouts.length === 0) { return [] }
  else if (props.workouts.length < 5) {
    // TODO sort_by
    return (
      props.workouts.map(workout =>
        <WorkoutCard
          className="handle"
          key={workout.id}
          setIsShown={props.setIsShown}
          workoutId={workout.id}
        />
      )
    )
  } else {
    return (
      <>
        {props.workouts.map(workout =>
          <WorkoutCard
            key={workout.id}
            setIsShown={props.setIsShown}
            workoutId={workout.id}
          />
        )}
        <div>Show More</div>
      </>
    )
  }
}

WorkoutCardWrapper.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  setIsShown: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  workouts: Selectors.getWorkoutsByDayNumberFilter(state, ownProps.dayNumber)
})

export default connect(mapStateToProps)(WorkoutCardWrapper)
