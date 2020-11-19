import React, { useState } from 'react'
import SearchCreate from '../components/SearchCreate'
import Menu from '../components/menu/Index'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

function SendExcercise(props) {
  const excercise = props.excercise

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "title": 'React POST Request Example' })
  }

  fetch('http://localhost:3000/logger', requestOptions)
    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
}

function RenderForm(props) {
  const excercises = props.excercises
  const excerciseCount = props.excerciseCount

  const [isWeightShown, setWeightIsShown] = useState(false)
  const [isForShown, setForIsShown] = useState(false)
  const [excercise, setExcercise] = useState("")

  const renderForm = []
  for (var i = 0; i < excerciseCount; i++) {
    renderForm.push(
      <table>
        <tr>
          <td>
            <SearchCreate
              label="Excercise Name"
              value={excercises}
              options={excerciseList}
            />
          </td>
          <td>
            <input
              onChange={e => setExcercise(e.target.value)}
              onBlur={() => SendExcercise(excercise)}
            />
          </td>
          <td>
            <SearchCreate
              label="Sets & Reps"
              options={setsrepsschemeList}
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
              onClick={() => props.setExcerciseCount(excerciseCount - 1)
            }>
              <DeleteIcon/>
            </IconButton>
          </td>
        </tr>
      </table>
    )
  }

  return renderForm
}

export default function Form(props) {
  const workoutDetails = props.workoutDetails
  const workoutName = props.workoutDetails.name
  const excercises = props.workoutDetails.excercises

  const [excerciseCount, setExcerciseCount] = useState(excercises.length)

  return (
    <div className="workout-form">
      <TextField
        d="standard-basic"
        label="Block Name"
        value={workoutName}
      />
      <RenderForm
        excercises={excercises}
        excerciseCount={excerciseCount}
        setExcerciseCount={setExcerciseCount}
      />
      <br/>
      <div
        className="hyperlink-button"
        onClick={() => setExcerciseCount(excerciseCount + 1)}
      >
        + Add Excercise
      </div>
    </div>
  );
}

const setsrepsschemeList = [
  { title: "3x10" },
  { title: "3x8" },
  { title: "3x10" },
  { title: "3x10,8,6" },
  { title: "5x10,8,6,4,2" }
]

const excerciseList = [
  { title: "Clean & Jerk", category: "Clean Variations" },
  { title: "Clean", category: "Clean Variations" },
  { title: "Hang Clean", category: "Clean Variations" },
  { title: "Power Clean", category: "Clean Variations" },
  { title: "Hang Power Clean", category: "Clean Variations" },
  { title: "Muscle Clean", category: "Clean Variations" },
  { title: "Clean Pull", category: "Clean Variations" },
  { title: "2-Position Clean", category: "Clean Variations" },
  { title: "2-Positions Power Clean", category: "Clean Variations" },
  { title: "3-Posistion Clean", category: "Clean Variations" },
  { title: "3-Posisiton Power Clean", category: "Clean Variations" },
  { title: "Block Clean Pull", category: "Clean Variations" },
  { title: "Block Clean", category: "Clean Variations" },
  { title: "Block Power Clean", category: "Clean Variations" },
  { title: "Clean High Pull", category: "Clean Variations" },
  { title: "Deficit Clean High Pull", category: "Clean Variations" },
  { title: "Deficit Clean Pull", category: "Clean Variations" },
  { title: "Clean Segment Pull", category: "Clean Variations" },
  { title: "Dip Clean", category: "Clean Variations" },
  { title: "Hang Clean Pull", category: "Clean Variations" },
  { title: "Hip Clean", category: "Clean Variations" },
  { title: "Power Clean into Front Squat", category: "Clean Variations" },
  { title: "Tall Muscle Clean", category: "Clean Variations" },
  { title: "Dumbbell Clean", category: "Clean Variations" },
  { title: "Dumbbell Clean and Jerk", category: "Clean Variations" },
  { title: "Snatch", category: "Snatch Variations" },
  { title: "Hang Snatch", category: "Snatch Variations" },
  { title: "Power Snatch", category: "Snatch Variations" },
  { title: "Hang Power Snatch", category: "Snatch Variations" },
  { title: "Clean Grip Snatch", category: "Snatch Variations" },
  { title: "Snatch Pull", category: "Snatch Variations" },
  { title: "Muscle Snatch", category: "Snatch Variations" },
  { title: "2-Position Power Snatch", category: "Snatch Variations" },
  { title: "2-Position Snatch", category: "Snatch Variations" },
  { title: "3-Position Power Snatch", category: "Snatch Variations" },
  { title: "3-Position Snatch", category: "Snatch Variations" },
  { title: "Block Power Snatch", category: "Snatch Variations" },
  { title: "Block Snatch", category: "Snatch Variations" },
  { title: "Block Snatch Pull", category: "Snatch Variations" },
  { title: "Dip Muscle Snatch", category: "Snatch Variations" },
  { title: "Dip Power Snatch", category: "Snatch Variations" },
  { title: "Dip Snatch", category: "Snatch Variations" },
  { title: "Hang Muscle Snatch", category: "Snatch Variations" },
  { title: "Hang Muscle Squat Snatch", category: "Snatch Variations" },
  { title: "Hang Snatch Pull", category: "Snatch Variations" },
  { title: "Snatch High Pull", category: "Snatch Variations" },
  { title: "Hip Snatch", category: "Snatch Variations" },
  { title: "Muscle Squat Snatch", category: "Snatch Variations" },
  { title: "Power Snatch From Power Position", category: "Snatch Variations" },
  { title: "Power Snatch into Overhead Squat", category: "Snatch Variations" },
  { title: "Press In Snatch (Sots Press)", category: "Snatch Variations" },
  { title: "Snatch Balance", category: "Snatch Variations" },
  { title: "Segment Power Snatch", category: "Snatch Variations" },
  { title: "Segment Snatch", category: "Snatch Variations" },
  { title: "High Hang Snatch Pull", category: "Snatch Variations" },
  { title: "Tall Muscle Snatch", category: "Snatch Variations" },
  { title: "Dumbbell Snatch", category: "Snatch Variations" },
  { title: "Split Jerk", category: "Jerk Variations" },
  { title: "Power Jerk", category: "Jerk Variations" },
  { title: "Jerk Balance", category: "Jerk Variations" },
  { title: "Behind the Neck Push Kerk", category: "Jerk Variations" },
  { title: "Push Jerk", category: "Jerk Variations" },
  { title: "Jerk Drive", category: "Jerk Variations" },
  { title: "Pause Jerk", category: "Jerk Variations" },
  { title: "Push Jerk in Split", category: "Jerk Variations" },
  { title: "Dumbbell Push Jerk", category: "Jerk Variations" },
  { title: "Dumbbell Split Jerk", category: "Jerk Variations" },
  { title: "Single Arm Dumbbell Jerk", category: "Jerk Variations" },
  { title: "Single Arm Dumbell Push Jerk", category: "Jerk Variations" },
  { title: "Air Squat", category: "Knee Dominant" },
  { title: "Overhead Squat", category: "Knee Dominant" },
  { title: "Back Squat", category: "Knee Dominant" },
  { title: "Font Squat", category: "Knee Dominant" },
  { title: "Goblet Squat", category: "Knee Dominant" },
  { title: "Safety Bar Squat", category: "Knee Dominant" },
  { title: "Zercher Squat", category: "Knee Dominant" },
  { title: "Jump Squat", category: "Knee Dominant" },
  { title: "Lateral Squat", category: "Knee Dominant" },
  { title: "Box Squat", category: "Knee Dominant" },
  { title: "Sumo Squat", category: "Knee Dominant" },
  { title: "Wall Squat", category: "Knee Dominant" },
  { title: "Hack Squat", category: "Knee Dominant" },
  { title: "Dumbbell Split Squat", category: "Knee Dominant" },
  { title: "Barbell Split Squat", category: "Knee Dominant" },
  { title: "Single-leg Squat", category: "Knee Dominant" },
  { title: "Pistol Squat", category: "Knee Dominant" },
  { title: "Forward Lunge (Dumbbell)", category: "Knee Dominant" },
  { title: "Walking Lunge (Dumbbell)", category: "Knee Dominant" },
  { title: "Reverse Lunge (Dumbbell)", category: "Knee Dominant" },
  { title: "Lateral Lunge (Dumbbell)", category: "Knee Dominant" },
  { title: "Forward Lunge (Barbell)", category: "Knee Dominant" },
  { title: "Walking Lunge (Barbell)", category: "Knee Dominant" },
  { title: "Reverse Lunge (Barbell)", category: "Knee Dominant" },
  { title: "Lateral Lunge (Barbell)", category: "Knee Dominant" },
  { title: "Overhead Lunges", category: "Knee Dominant" },
  { title: "Overhead Reverse Lunges", category: "Knee Dominant" },
  { title: "Overhead Split Squat", category: "Knee Dominant" },
  { title: "Overhead Lateral Lunge", category: "Knee Dominant" },
  { title: "Overhead Walking Lunges", category: "Knee Dominant" },
  { title: "Step-Up (Dumbbell)", category: "Knee Dominant" },
  { title: "Step-Up (Barbell)", category: "Knee Dominant" },
  { title: "Leg Press", category: "Knee Dominant" },
  { title: "Single-leg Leg Press", category: "Knee Dominant" },
  { title: "Lateral Step-Up", category: "Knee Dominant" },
  { title: "Leg Extension", category: "Knee Dominant" },
  { title: "Step Down", category: "Knee Dominant" },
  { title: "Front Foot Elevated Split Squat", category: "Knee Dominant" },
  { title: "Weighted Box Step Up ", category: "Knee Dominant" },
  { title: "Weighted Box Step Over", category: "Knee Dominant" },
  { title: "Goblet Bulgarian Split Squat", category: "Knee Dominant" },
  { title: "Goblet Lateral Lunges", category: "Knee Dominant" },
  { title: "Goblet Lateral Split Squat", category: "Knee Dominant" },
  { title: "Goblet Split Squat", category: "Knee Dominant" },
  { title: "Dumbbell Overhead Squat", category: "Knee Dominant" },
  { title: "Deadlift", category: "Hip Dominant" },
  { title: "Sumo Deadlift", category: "Hip Dominant" },
  { title: "Deficit Deadlift", category: "Hip Dominant" },
  { title: "Deadlift from Blocks", category: "Hip Dominant" },
  { title: "Rack Pull", category: "Hip Dominant" },
  { title: "Snatch Grip Deadlift", category: "Hip Dominant" },
  { title: "Good Morning", category: "Hip Dominant" },
  { title: "Seated Good Morning", category: "Hip Dominant" },
  { title: "Sumo Good Morning", category: "Hip Dominant" },
  { title: "Dumbbell Romanian Deadlift (RDL)", category: "Hip Dominant" },
  { title: "Dumbbell Romanian Deadlift 1-Arm/1-Leg (Contralateral)", category: "Hip Dominant" },
  { title: "Dumbbell Romanian Deadlift 1-Arm/1-Leg (Ipsilateral)", category: "Hip Dominant" },
  { title: "Dumbell Romanian Deadlift 2-Arm/1-Leg", category: "Hip Dominant" },
  { title: "Single-leg Romanian Deadlift (Barbell) (RDL)", category: "Hip Dominant" },
  { title: "Romainian Deadlift (Barbell)", category: "Hip Dominant" },
  { title: "Zerher Romanian Deadlift (RDL)", category: "Hip Dominant" },
  { title: "Stiff-Legged Deadlift", category: "Hip Dominant" },
  { title: "Kettlebell Swing", category: "Hip Dominant" },
  { title: "Hamstring Curl", category: "Hip Dominant" },
  { title: "Single-Leg Good Morning", category: "Hip Dominant" },
  { title: "Single Leg Hip Trust", category: "Hip Dominant" },
  { title: "Hip Thrust", category: "Hip Dominant" },
  { title: "Weighted Glute Bridge", category: "Hip Dominant" },
  { title: "Weight Single Leg Glute Bridge", category: "Hip Dominant" },
  { title: "Dumbbell Deadlift", category: "Hip Dominant" },
  { title: "Glute Bridge (Ball)", category: "Hip Dominant" },
  { title: "Glute Bridge (Elevated Feet)", category: "Hip Dominant" },
  { title: "Glute Bridge (Floor)", category: "Hip Dominant" },
  { title: "Glute Bridge Single Leg (Ball)", category: "Hip Dominant" },
  { title: "Glute Bridge Single Leg (Elevated Feet)", category: "Hip Dominant" },
  { title: "Glute Bridge Single Leg (Floor)", category: "Hip Dominant" },
  { title: "Glute Bridge Single Leg Alternating (Floor)", category: "Hip Dominant" },
  { title: "Glute Ham Raise", category: "Hip Dominant" },
  { title: "Glute Ham Raise ISO Hold", category: "Hip Dominant" },
  { title: "Glute Ham Raise Single Leg ISO Hold", category: "Hip Dominant" },
  { title: "Glute Ham Raise Drop Catch", category: "Hip Dominant" },
  { title: "Glute Ham Raise Single Leg Drop Catch", category: "Hip Dominant" },
  { title: "Hamstring Slide Boards", category: "Hip Dominant" },
  { title: "Hamstring Slide Boards Single Leg", category: "Hip Dominant" },
  { title: "Straight Leg Hip Bridge", category: "Hip Dominant" },
  { title: "Single Leg Straight Leg Hip Bridge", category: "Hip Dominant" },
  { title: "Ball Leg Curls", category: "Hip Dominant" },
  { title: "Single Leg Ball Leg Curls", category: "Hip Dominant" },
  { title: "Copenhagen Plank (Long Lever)", category: "Hip Dominant" },
  { title: "Copenhagen Plank (Short Lever)", category: "Hip Dominant" },
  { title: "Back Extension", category: "Hip Dominant" },
  { title: "Jefferson Curl", category: "Hip Dominant" },
  { title: "Reverse Hyper", category: "Hip Dominant" },
  { title: "Rotation Back Extension", category: "Hip Dominant" },
  { title: "Hyper 45 degree", category: "Hip Dominant" },
  { title: "Hyper 45 degree Single Leg", category: "Hip Dominant" },
  { title: "Hyper 90 degree", category: "Hip Dominant" },
  { title: "Hyper 90 degree Single Leg", category: "Hip Dominant" },
  { title: "Sled Push", category: "Sleds and Carries" },
  { title: "Sled Pull", category: "Sleds and Carries" },
  { title: "Farmers Walks", category: "Sleds and Carries" },
  { title: "Sled Backward Walk", category: "Sleds and Carries" },
  { title: "Sled Cross Over Walk", category: "Sleds and Carries" },
  { title: "Sled Diagonal Bakcward Pushes", category: "Sleds and Carries" },
  { title: "Sled Lateral Pushes", category: "Sleds and Carries" },
  { title: "Sled Marching", category: "Sleds and Carries" },
  { title: "Sled Walking Lunges", category: "Sleds and Carries" },
  { title: "Bench Press", category: "Horizontal Pressing" },
  { title: "Incline Bech Press", category: "Horizontal Pressing" },
  { title: "Decline Bench Press", category: "Horizontal Pressing" },
  { title: "Close Grip Bench Press", category: "Horizontal Pressing" },
  { title: "Dumbbell Bench Press", category: "Horizontal Pressing" },
  { title: "Incline Dumbbel Bench Press", category: "Horizontal Pressing" },
  { title: "Single Arm Incline Dumbbel Bench Press", category: "Horizontal Pressing" },
  { title: "Single-Arm Dumbbel Bench Press", category: "Horizontal Pressing" },
  { title: "Alternating Dumbbel Bench Press", category: "Horizontal Pressing" },
  { title: "Alternating Incline Dumbbel Bench Press", category: "Horizontal Pressing" },
  { title: "Pause Bench Press", category: "Horizontal Pressing" },
  { title: "Pause Bench Press", category: "Horizontal Pressing" },
  { title: "Dumbbell Floor Press", category: "Horizontal Pressing" },
  { title: "Barbell Floor Press", category: "Horizontal Pressing" },
  { title: "Push Up", category: "Horizontal Pressing" },
  { title: "Incline Push Up", category: "Horizontal Pressing" },
  { title: "Eccentric Push Up", category: "Horizontal Pressing" },
  { title: "Barbell Overhead Press", category: "Vertical Pressing" },
  { title: "Dumbell Overhead Press", category: "Vertical Pressing" },
  { title: "Seated Dumbell Overhead Press", category: "Vertical Pressing" },
  { title: "Barbell Push Press", category: "Vertical Pressing" },
  { title: "Dumbell Push Press", category: "Vertical Pressing" },
  { title: "Single-Arm Dumbbell Push Press", category: "Vertical Pressing" },
  { title: "Snatch Press", category: "Vertical Pressing" },
  { title: "Snatch Push Press", category: "Vertical Pressing" },
  { title: "Barbell Push Press", category: "Vertical Pressing" },
  { title: "Dumbbell Push Press", category: "Vertical Pressing" },
  { title: "Single Arm Dumbbell Push Press", category: "Vertical Pressing" },
  { title: "Alternating Dumbbell Shoulder Press", category: "Vertical Pressing" },
  { title: "Sots Press", category: "Vertical Pressing" },
  { title: "Arnold Press", category: "Vertical Pressing" },
  { title: "Half-Kneeling Single Arm Dumbell Press", category: "Vertical Pressing" },
  { title: "Half-kneeling Land Mine Press", category: "Vertical Pressing" },
  { title: "Single Arm Land Mine Press", category: "Vertical Pressing" },
  { title: "Military Press", category: "Vertical Pressing" },
  { title: "Cuban Press (Barbell)", category: "Vertical Pressing" },
  { title: "Cuban Press (Dumbell)", category: "Vertical Pressing" },
  { title: "Ring Dips", category: "Vertical Pressing" },
  { title: "Dips", category: "Vertical Pressing" },
  { title: "Dumbbell Row", category: "Horizontal Pulling" },
  { title: "Barbell Bent Over Row", category: "Horizontal Pulling" },
  { title: "Inverted Row (Supinated)", category: "Horizontal Pulling" },
  { title: "Inverted Row (Pronated)", category: "Horizontal Pulling" },
  { title: "Seated Cable Row", category: "Horizontal Pulling" },
  { title: "Seated Cable Row (Pronated)", category: "Horizontal Pulling" },
  { title: "Seated Cable Row (Rope)", category: "Horizontal Pulling" },
  { title: "Seated Cable Row (Supinated)", category: "Horizontal Pulling" },
  { title: "Single Arm Seated Cable Row", category: "Horizontal Pulling" },
  { title: "Ring Rows", category: "Horizontal Pulling" },
  { title: "TRX Rows", category: "Horizontal Pulling" },
  { title: "Pendlay Row", category: "Horizontal Pulling" },
  { title: "Dumbell Banch Pull", category: "Horizontal Pulling" },
  { title: "Barbell bench Pull", category: "Horizontal Pulling" },
  { title: "Feet Elvevated Inverted Row", category: "Horizontal Pulling" },
  { title: "Single Arm Cable Row (Pronated)", category: "Horizontal Pulling" },
  { title: "Single Arm Cable Row (Supinated)", category: "Horizontal Pulling" },
  { title: "Chest Suported Incline Row", category: "Horizontal Pulling" },
  { title: "DB Bent Over Row 1-Arm (Neutral)", category: "Horizontal Pulling" },
  { title: "DB Bent Over Row 1-Arm (Wide)", category: "Horizontal Pulling" },
  { title: "DB Bent Over Row 2-Arm (Alternating)", category: "Horizontal Pulling" },
  { title: "DB Bent Over Row 2-Arm (Neutral)", category: "Horizontal Pulling" },
  { title: "DB Bent Over Row 2-Arm (Wide)", category: "Horizontal Pulling" },
  { title: "Rings Inverted Row (Neutral)", category: "Horizontal Pulling" },
  { title: "Rings Inverted Row (Rotation)", category: "Horizontal Pulling" },
  { title: "Rings Inverted Row (Wide)", category: "Horizontal Pulling" },
  { title: "Rings Inverted Row 1-Arm", category: "Horizontal Pulling" },
  { title: "T-Bar Row", category: "Horizontal Pulling" },
  { title: "Rings Pull Ups (Neutral)", category: "Vertical Pulling" },
  { title: "Rings Pull Ups (Pronated)", category: "Vertical Pulling" },
  { title: "Rings Pull Ups (Supinated)", category: "Vertical Pulling" },
  { title: "Rings Pull Ups (Wide)", category: "Vertical Pulling" },
  { title: "Rope Climbs", category: "Vertical Pulling" },
  { title: "Towel Pull-ups", category: "Vertical Pulling" },
  { title: "Chin Up (overhand)", category: "Vertical Pulling" },
  { title: "Chin Up (underhand)", category: "Vertical Pulling" },
  { title: "Chin Up (netural)", category: "Vertical Pulling" },
  { title: "Lat Pull Down (Neutral)", category: "Vertical Pulling" },
  { title: "Lat Pull Down (Pronated)", category: "Vertical Pulling" },
  { title: "Lat Pull Down (Supinated)", category: "Vertical Pulling" },
  { title: "Lat Pull Down (Wide)", category: "Vertical Pulling" },
  { title: "Close Grip lat Pulldown", category: "Vertical Pulling" },
  { title: "Dumbbell Upright Row", category: "Vertical Pulling" },
  { title: "Barbell Upright Row", category: "Vertical Pulling" },
  { title: "Dumbbell Upright Row", category: "Vertical Pulling" },
  { title: "Barbell Upright Row", category: "Vertical Pulling" },
  { title: "Eccentric Chin Ups", category: "Vertical Pulling" },
  { title: "Barbell Curls", category: "Isolation" },
  { title: "Dumbbell Curls", category: "Isolation" },
  { title: "Alternating Dumbell Curls", category: "Isolation" },
  { title: "EZ Bar Curls", category: "Isolation" },
  { title: "Preacher Curls", category: "Isolation" },
  { title: "Cable Curls", category: "Isolation" },
  { title: "Hammer Curls", category: "Isolation" },
  { title: "Single Arm Cable Curls", category: "Isolation" },
  { title: "Tricep Push Down", category: "Isolation" },
  { title: "Overhead Tricep Extensions", category: "Isolation" },
  { title: "Skull Crushers", category: "Isolation" },
  { title: "Dumbbell Skull Crushers", category: "Isolation" },
  { title: "Rope Push Downs", category: "Isolation" },
  { title: "Single Arm Tricep Push Down", category: "Isolation" },
  { title: "Dumbell External Rotation", category: "Isolation" },
  { title: "Dumbell Internal Rotation", category: "Isolation" },
  { title: "Band External Rotation 0 Deg", category: "Isolation" },
  { title: "Band External Rotation 90 Deg", category: "Isolation" },
  { title: "Band Row to External Rotation 90 Deg", category: "Isolation" },
  { title: "Eccentric Band External Rotation 0 Deg", category: "Isolation" },
  { title: "Eccentric Band External Rotation 90 Deg", category: "Isolation" },
  { title: "Supine Eccentric External Roation 90 Deg", category: "Isolation" },
  { title: "Band High Row to Y", category: "Isolation" },
  { title: "TRX-Y's", category: "Isolation" },
  { title: "TRX-I's", category: "Isolation" },
  { title: "TRX-T's", category: "Isolation" },
  { title: "TRX-I,T,Y", category: "Isolation" },
  { title: "Cable Face Pull", category: "Isolation" },
  { title: "TRX Face Pull", category: "Isolation" },
  { title: "Band Face Pull", category: "Isolation" },
  { title: "Band Pull Apart", category: "Isolation" },
  { title: "Dumbbel Front Raise", category: "Isolation" },
  { title: "Dumbbell Lateral Raise", category: "Isolation" },
  { title: "Dumbbell Rear Delt Flys", category: "Isolation" },
  { title: "Dumbbell Flys", category: "Isolation" },
  { title: "Dumbbell Upright Row", category: "Isolation" },
  { title: "Alternating Dumbell Uprigth Row", category: "Isolation" },
  { title: "Band Overhead Y", category: "Isolation" },
  { title: "Handstand Hold", category: "Gymnastics" },
  { title: "Handstand Walk ", category: "Gymnastics" },
  { title: "Handstand Push Up ", category: "Gymnastics" },
  { title: "Bar Muscle Up", category: "Gymnastics" },
  { title: "Ring Muscle Up", category: "Gymnastics" },
  { title: "AB Rollout", category: "Abs" },
  { title: "Alternating Leg Raise", category: "Abs" },
  { title: "Leg Raises", category: "Abs" },
  { title: "Back Plank", category: "Abs" },
  { title: "Bird Dog", category: "Abs" },
  { title: "Cross Body Chop", category: "Abs" },
  { title: "Crunch", category: "Abs" },
  { title: "Dead Bug", category: "Abs" },
  { title: "Decline Sit-Up", category: "Abs" },
  { title: "Drangon Fly", category: "Abs" },
  { title: "Floor Wipers", category: "Abs" },
  { title: "Flutter Kicks", category: "Abs" },
  { title: "GHD Sit-Up", category: "Abs" },
  { title: "GHD Sit-Up Hold", category: "Abs" },
  { title: "Hanging Leg Raise", category: "Abs" },
  { title: "Hollow Body Hold", category: "Abs" },
  { title: "Hollow Body Rock", category: "Abs" },
  { title: "Jack Knife", category: "Abs" },
  { title: "TRX Jack Knife", category: "Abs" },
  { title: "Toes to Bar", category: "Abs" },
  { title: "L-Sit", category: "Abs" },
  { title: "Plank", category: "Abs" },
  { title: "Pallof Press", category: "Abs" },
  { title: "Plank March", category: "Abs" },
  { title: "Plank Pull-Through", category: "Abs" },
  { title: "Reverse Crunch", category: "Abs" },
  { title: "Rolling Pin", category: "Abs" },
  { title: "Russian Twist", category: "Abs" },
  { title: "Side Bend", category: "Abs" },
  { title: "Side Plank", category: "Abs" },
  { title: "Side Plank + Leg Lift", category: "Abs" },
  { title: "Side Plank Lift", category: "Abs" },
  { title: "Standing Twist", category: "Abs" },
  { title: "Star Side Plank", category: "Abs" },
  { title: "Super Man Hold", category: "Abs" },
  { title: "Sky Divers", category: "Abs" },
  { title: "V-Up", category: "Abs" },
  { title: "Windshield Wipers", category: "Abs" },
  { title: "Ab Mat Sit Up ", category: "Abs" },
  { title: "Box Jumps", category: "Jumps" },
  { title: "Burpee Broad Jump", category: "Jumps" },
  { title: "Burpee Box Jump ", category: "Jumps" },
  { title: "Burpee Box Jump Over", category: "Jumps" },
  { title: "Box Jump Over", category: "Jumps" },
  { title: "Skipping", category: "Jumps" },
  { title: "Double Unders", category: "Jumps" },
  { title: "Drop Jump ", category: "Jumps" },
  { title: "Depth Jump", category: "Jumps" },
  { title: "High Hurdle Jumps", category: "Jumps" },
  { title: "Low Hurdle Hop", category: "Jumps" },
  { title: "High Hurdle Hop", category: "Jumps" },
  { title: "Power Skip", category: "Jumps" },
  { title: "Pogo Hops", category: "Jumps" },
  { title: "Tuck Jump", category: "Jumps" },
  { title: "Split Squat Jumps", category: "Jumps" },
  { title: "Speed Skaters", category: "Jumps" },
  { title: "Lateral Box Jump", category: "Jumps" },
  { title: "Trap-Bar Jump", category: "Jumps" },
  { title: "Weighted Box Jumps", category: "Jumps" },
  { title: "Eccentric Box Jumps", category: "Jumps" },
  { title: "Seated Box Jumps", category: "Jumps" },
  { title: "Broard Jump", category: "Jumps" },
  { title: "Squat Jump", category: "Jumps" },
  { title: "Bounding", category: "Jumps" },
  { title: "Medicine Ball Chest Pass", category: "Throws" },
  { title: "Wall Balls", category: "Throws" },
  { title: "Sandbag Over The Shoulder", category: "Throws" },
  { title: "Chest Pass", category: "Throws" },
  { title: "Kneeling Chest Pass", category: "Throws" },
  { title: "Half Kneeling Chest Pass", category: "Throws" },
  { title: "Side to Side Pass", category: "Throws" },
  { title: "Seated Lateral Pass", category: "Throws" },
  { title: "Seated Shot Put", category: "Throws" },
  { title: "Wood Chop Throw", category: "Throws" },
  { title: "Slam", category: "Throws" },
  { title: "Split Stance Lateral Toss", category: "Throws" },
  { title: "Lateral Power Throw", category: "Throws" },
  { title: "Pitcher Throw", category: "Throws" },
  { title: "Single Leg Throw In", category: "Throws" },
  { title: "Over the Shoulder Toss", category: "Throws" },
  { title: "Single Step Shot Put", category: "Throws" },
  { title: "Front Facing Heave", category: "Throws" },
  { title: "Row", category: "Cardio" },
  { title: "Run", category: "Cardio" },
  { title: "Swim", category: "Cardio" },
  { title: "Bike", category: "Cardio" },
  { title: "Assult Bike", category: "Cardio" },
  { title: "Bike Erg", category: "Cardio" },
  { title: "Ski Erg", category: "Cardio" },
  { title: "Battle Ropes", category: "Cardio" }
]
