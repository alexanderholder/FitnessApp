/* eslint-disable no-use-before-define */
// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogActions from '@material-ui/core/DialogActions';
// import Button from '@material-ui/core/Button';
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Grouped() {
  const options = excercises.map((option) => {
    const etype = option.type[0].toUpperCase();
    return {
      etype: /Clean Variations/.test(etype) ? 'Clean Variations' : etype,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.etype.localeCompare(a.etype))}
      groupBy={(option) => option.etype}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
      // size='small'
      // renderGroup={(option) => option.etype}
    />
  );
}

// const filter = createFilterOptions();

// export default function SearchCreate() {
//   const [value, setValue] = React.useState(null);
//   const [open, toggleOpen] = React.useState(false);

//   const handleClose = () => {
//     setDialogValue({
//       title: '',
//       year: '',
//     });

//     toggleOpen(false);
//   };

//   const [dialogValue, setDialogValue] = React.useState({
//     title: '',
//     year: '',
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setValue({
//       title: dialogValue.title,
//       year: parseInt(dialogValue.year, 10),
//     });

//     handleClose();
//   };

//   return (
//     <React.Fragment>
//       <Autocomplete
//         value={value}
//         onChange={(event, newValue) => {
//           if (typeof newValue === 'string') {
//             // timeout to avoid instant validation of the dialog's form.
//             setTimeout(() => {
//               toggleOpen(true);
//               setDialogValue({
//                 title: newValue,
//                 year: '',
//               });
//             });
//           } else if (newValue && newValue.inputValue) {
//             toggleOpen(true);
//             setDialogValue({
//               title: newValue.inputValue,
//               year: '',
//             });
//           } else {
//             setValue(newValue);
//           }
//         }}
//         filterOptions={(options, params) => {
//           const filtered = filter(options, params);

//           if (params.inputValue !== '') {
//             filtered.push({
//               inputValue: params.inputValue,
//               title: `Add "${params.inputValue}"`,
//             });
//           }

//           return filtered;
//         }}
//         id="free-solo-dialog-demo"
//         options={excercises}
//         getOptionLabel={(option) => {
//           // e.g value selected with enter, right from the input
//           if (typeof option === 'string') {
//             return option;
//           }
//           if (option.inputValue) {
//             return option.inputValue;
//           }
//           return option.title;
//         }}
//         selectOnFocus
//         clearOnBlur
//         handleHomeEndKeys
//         renderOption={(option) => option.title}
//         style={{ width: 300 }}
//         freeSolo
//         renderInput={(params) => (
//           <TextField {...params} label="Free solo dialog" variant="outlined" />
//         )}
//       />
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <form onSubmit={handleSubmit}>
//           <DialogTitle id="form-dialog-title">Add a new film</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Did you miss any film in our list? Please, add it!
//             </DialogContentText>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               value={dialogValue.title}
//               onChange={(event) => setDialogValue({ ...dialogValue, title: event.target.value })}
//               label="title"
//               type="text"
//             />
//             <TextField
//               margin="dense"
//               id="name"
//               value={dialogValue.year}
//               onChange={(event) => setDialogValue({ ...dialogValue, year: event.target.value })}
//               label="year"
//               type="number"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button type="submit" color="primary">
//               Add
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </React.Fragment>
//   );
// }

const excercises = [
  { title: "Clean & Jerk", type: "Clean Variations" },
  { title: "Clean", type: "Clean Variations" },
  { title: "Hang Clean", type: "Clean Variations" },
  { title: "Power Clean", type: "Clean Variations" },
  { title: "Hang Power Clean", type: "Clean Variations" },
  { title: "Muscle Clean", type: "Clean Variations" },
  { title: "Clean Pull", type: "Clean Variations" },
  { title: "2-Position Clean", type: "Clean Variations" },
  { title: "2-Positions Power Clean", type: "Clean Variations" },
  { title: "3-Posistion Clean", type: "Clean Variations" },
  { title: "3-Posisiton Power Clean", type: "Clean Variations" },
  { title: "Block Clean Pull", type: "Clean Variations" },
  { title: "Block Clean", type: "Clean Variations" },
  { title: "Block Power Clean", type: "Clean Variations" },
  { title: "Clean High Pull", type: "Clean Variations" },
  { title: "Deficit Clean High Pull", type: "Clean Variations" },
  { title: "Deficit Clean Pull", type: "Clean Variations" },
  { title: "Clean Segment Pull", type: "Clean Variations" },
  { title: "Dip Clean", type: "Clean Variations" },
  { title: "Hang Clean Pull", type: "Clean Variations" },
  { title: "Hip Clean", type: "Clean Variations" },
  { title: "Power Clean into Front Squat", type: "Clean Variations" },
  { title: "Tall Muscle Clean", type: "Clean Variations" },
  { title: "Dumbbell Clean", type: "Clean Variations" },
  { title: "Dumbbell Clean and Jerk", type: "Clean Variations" },
  { title: "Snatch", type: "Snatch Variations" },
  { title: "Hang Snatch", type: "Snatch Variations" },
  { title: "Power Snatch", type: "Snatch Variations" },
  { title: "Hang Power Snatch", type: "Snatch Variations" },
  { title: "Clean Grip Snatch", type: "Snatch Variations" },
  { title: "Snatch Pull", type: "Snatch Variations" },
  { title: "Muscle Snatch", type: "Snatch Variations" },
  { title: "2-Position Power Snatch", type: "Snatch Variations" },
  { title: "2-Position Snatch", type: "Snatch Variations" },
  { title: "3-Position Power Snatch", type: "Snatch Variations" },
  { title: "3-Position Snatch", type: "Snatch Variations" },
  { title: "Block Power Snatch", type: "Snatch Variations" },
  { title: "Block Snatch", type: "Snatch Variations" },
  { title: "Block Snatch Pull", type: "Snatch Variations" },
  { title: "Dip Muscle Snatch", type: "Snatch Variations" },
  { title: "Dip Power Snatch", type: "Snatch Variations" },
  { title: "Dip Snatch", type: "Snatch Variations" },
  { title: "Hang Muscle Snatch", type: "Snatch Variations" },
  { title: "Hang Muscle Squat Snatch", type: "Snatch Variations" },
  { title: "Hang Snatch Pull", type: "Snatch Variations" },
  { title: "Snatch High Pull", type: "Snatch Variations" },
  { title: "Hip Snatch", type: "Snatch Variations" },
  { title: "Muscle Squat Snatch", type: "Snatch Variations" },
  { title: "Power Snatch From Power Position", type: "Snatch Variations" },
  { title: "Power Snatch into Overhead Squat", type: "Snatch Variations" },
  { title: "Press In Snatch (Sots Press)", type: "Snatch Variations" },
  { title: "Snatch Balance", type: "Snatch Variations" },
  { title: "Segment Power Snatch", type: "Snatch Variations" },
  { title: "Segment Snatch", type: "Snatch Variations" },
  { title: "High Hang Snatch Pull", type: "Snatch Variations" },
  { title: "Tall Muscle Snatch", type: "Snatch Variations" },
  { title: "Dumbbell Snatch", type: "Snatch Variations" },
  { title: "Split Jerk", type: "Jerk Variations" },
  { title: "Power Jerk", type: "Jerk Variations" },
  { title: "Jerk Balance", type: "Jerk Variations" },
  { title: "Behind the Neck Push Kerk", type: "Jerk Variations" },
  { title: "Push Jerk", type: "Jerk Variations" },
  { title: "Jerk Drive", type: "Jerk Variations" },
  { title: "Pause Jerk", type: "Jerk Variations" },
  { title: "Push Jerk in Split", type: "Jerk Variations" },
  { title: "Dumbbell Push Jerk", type: "Jerk Variations" },
  { title: "Dumbbell Split Jerk", type: "Jerk Variations" },
  { title: "Single Arm Dumbbell Jerk", type: "Jerk Variations" },
  { title: "Single Arm Dumbell Push Jerk", type: "Jerk Variations" },
  { title: "Air Squat", type: "Knee Dominant" },
  { title: "Overhead Squat", type: "Knee Dominant" },
  { title: "Back Squat", type: "Knee Dominant" },
  { title: "Font Squat", type: "Knee Dominant" },
  { title: "Goblet Squat", type: "Knee Dominant" },
  { title: "Safety Bar Squat", type: "Knee Dominant" },
  { title: "Zercher Squat", type: "Knee Dominant" },
  { title: "Jump Squat", type: "Knee Dominant" },
  { title: "Lateral Squat", type: "Knee Dominant" },
  { title: "Box Squat", type: "Knee Dominant" },
  { title: "Sumo Squat", type: "Knee Dominant" },
  { title: "Wall Squat", type: "Knee Dominant" },
  { title: "Hack Squat", type: "Knee Dominant" },
  { title: "Dumbbell Split Squat", type: "Knee Dominant" },
  { title: "Barbell Split Squat", type: "Knee Dominant" },
  { title: "Single-leg Squat", type: "Knee Dominant" },
  { title: "Pistol Squat", type: "Knee Dominant" },
  { title: "Forward Lunge (Dumbbell)", type: "Knee Dominant" },
  { title: "Walking Lunge (Dumbbell)", type: "Knee Dominant" },
  { title: "Reverse Lunge (Dumbbell)", type: "Knee Dominant" },
  { title: "Lateral Lunge (Dumbbell)", type: "Knee Dominant" },
  { title: "Forward Lunge (Barbell)", type: "Knee Dominant" },
  { title: "Walking Lunge (Barbell)", type: "Knee Dominant" },
  { title: "Reverse Lunge (Barbell)", type: "Knee Dominant" },
  { title: "Lateral Lunge (Barbell)", type: "Knee Dominant" },
  { title: "Overhead Lunges", type: "Knee Dominant" },
  { title: "Overhead Reverse Lunges", type: "Knee Dominant" },
  { title: "Overhead Split Squat", type: "Knee Dominant" },
  { title: "Overhead Lateral Lunge", type: "Knee Dominant" },
  { title: "Overhead Walking Lunges", type: "Knee Dominant" },
  { title: "Step-Up (Dumbbell)", type: "Knee Dominant" },
  { title: "Step-Up (Barbell)", type: "Knee Dominant" },
  { title: "Leg Press", type: "Knee Dominant" },
  { title: "Single-leg Leg Press", type: "Knee Dominant" },
  { title: "Lateral Step-Up", type: "Knee Dominant" },
  { title: "Leg Extension", type: "Knee Dominant" },
  { title: "Step Down", type: "Knee Dominant" },
  { title: "Front Foot Elevated Split Squat", type: "Knee Dominant" },
  { title: "Weighted Box Step Up ", type: "Knee Dominant" },
  { title: "Weighted Box Step Over", type: "Knee Dominant" },
  { title: "Goblet Bulgarian Split Squat", type: "Knee Dominant" },
  { title: "Goblet Lateral Lunges", type: "Knee Dominant" },
  { title: "Goblet Lateral Split Squat", type: "Knee Dominant" },
  { title: "Goblet Split Squat", type: "Knee Dominant" },
  { title: "Dumbbell Overhead Squat", type: "Knee Dominant" },
  { title: "Deadlift", type: "Hip Dominant" },
  { title: "Sumo Deadlift", type: "Hip Dominant" },
  { title: "Deficit Deadlift", type: "Hip Dominant" },
  { title: "Deadlift from Blocks", type: "Hip Dominant" },
  { title: "Rack Pull", type: "Hip Dominant" },
  { title: "Snatch Grip Deadlift", type: "Hip Dominant" },
  { title: "Good Morning", type: "Hip Dominant" },
  { title: "Seated Good Morning", type: "Hip Dominant" },
  { title: "Sumo Good Morning", type: "Hip Dominant" },
  { title: "Dumbbell Romanian Deadlift (RDL)", type: "Hip Dominant" },
  { title: "Dumbbell Romanian Deadlift 1-Arm/1-Leg (Contralateral)", type: "Hip Dominant" },
  { title: "Dumbbell Romanian Deadlift 1-Arm/1-Leg (Ipsilateral)", type: "Hip Dominant" },
  { title: "Dumbell Romanian Deadlift 2-Arm/1-Leg", type: "Hip Dominant" },
  { title: "Single-leg Romanian Deadlift (Barbell) (RDL)", type: "Hip Dominant" },
  { title: "Romainian Deadlift (Barbell)", type: "Hip Dominant" },
  { title: "Zerher Romanian Deadlift (RDL)", type: "Hip Dominant" },
  { title: "Stiff-Legged Deadlift", type: "Hip Dominant" },
  { title: "Kettlebell Swing", type: "Hip Dominant" },
  { title: "Hamstring Curl", type: "Hip Dominant" },
  { title: "Single-Leg Good Morning", type: "Hip Dominant" },
  { title: "Single Leg Hip Trust", type: "Hip Dominant" },
  { title: "Hip Thrust", type: "Hip Dominant" },
  { title: "Weighted Glute Bridge", type: "Hip Dominant" },
  { title: "Weight Single Leg Glute Bridge", type: "Hip Dominant" },
  { title: "Dumbbell Deadlift", type: "Hip Dominant" },
  { title: "Glute Bridge (Ball)", type: "Hip Dominant" },
  { title: "Glute Bridge (Elevated Feet)", type: "Hip Dominant" },
  { title: "Glute Bridge (Floor)", type: "Hip Dominant" },
  { title: "Glute Bridge Single Leg (Ball)", type: "Hip Dominant" },
  { title: "Glute Bridge Single Leg (Elevated Feet)", type: "Hip Dominant" },
  { title: "Glute Bridge Single Leg (Floor)", type: "Hip Dominant" },
  { title: "Glute Bridge Single Leg Alternating (Floor)", type: "Hip Dominant" },
  { title: "Glute Ham Raise", type: "Hip Dominant" },
  { title: "Glute Ham Raise ISO Hold", type: "Hip Dominant" },
  { title: "Glute Ham Raise Single Leg ISO Hold", type: "Hip Dominant" },
  { title: "Glute Ham Raise Drop Catch", type: "Hip Dominant" },
  { title: "Glute Ham Raise Single Leg Drop Catch", type: "Hip Dominant" },
  { title: "Hamstring Slide Boards", type: "Hip Dominant" },
  { title: "Hamstring Slide Boards Single Leg", type: "Hip Dominant" },
  { title: "Straight Leg Hip Bridge", type: "Hip Dominant" },
  { title: "Single Leg Straight Leg Hip Bridge", type: "Hip Dominant" },
  { title: "Ball Leg Curls", type: "Hip Dominant" },
  { title: "Single Leg Ball Leg Curls", type: "Hip Dominant" },
  { title: "Copenhagen Plank (Long Lever)", type: "Hip Dominant" },
  { title: "Copenhagen Plank (Short Lever)", type: "Hip Dominant" },
  { title: "Back Extension", type: "Hip Dominant" },
  { title: "Jefferson Curl", type: "Hip Dominant" },
  { title: "Reverse Hyper", type: "Hip Dominant" },
  { title: "Rotation Back Extension", type: "Hip Dominant" },
  { title: "Hyper 45 degree", type: "Hip Dominant" },
  { title: "Hyper 45 degree Single Leg", type: "Hip Dominant" },
  { title: "Hyper 90 degree", type: "Hip Dominant" },
  { title: "Hyper 90 degree Single Leg", type: "Hip Dominant" },
  { title: "Sled Push", type: "Sleds and Carries" },
  { title: "Sled Pull", type: "Sleds and Carries" },
  { title: "Farmers Walks", type: "Sleds and Carries" },
  { title: "Sled Backward Walk", type: "Sleds and Carries" },
  { title: "Sled Cross Over Walk", type: "Sleds and Carries" },
  { title: "Sled Diagonal Bakcward Pushes", type: "Sleds and Carries" },
  { title: "Sled Lateral Pushes", type: "Sleds and Carries" },
  { title: "Sled Marching", type: "Sleds and Carries" },
  { title: "Sled Walking Lunges", type: "Sleds and Carries" },
  { title: "Bench Press", type: "Horizontal Pressing" },
  { title: "Incline Bech Press", type: "Horizontal Pressing" },
  { title: "Decline Bench Press", type: "Horizontal Pressing" },
  { title: "Close Grip Bench Press", type: "Horizontal Pressing" },
  { title: "Dumbbell Bench Press", type: "Horizontal Pressing" },
  { title: "Incline Dumbbel Bench Press", type: "Horizontal Pressing" },
  { title: "Single Arm Incline Dumbbel Bench Press", type: "Horizontal Pressing" },
  { title: "Single-Arm Dumbbel Bench Press", type: "Horizontal Pressing" },
  { title: "Alternating Dumbbel Bench Press", type: "Horizontal Pressing" },
  { title: "Alternating Incline Dumbbel Bench Press", type: "Horizontal Pressing" },
  { title: "Pause Bench Press", type: "Horizontal Pressing" },
  { title: "Pause Bench Press", type: "Horizontal Pressing" },
  { title: "Dumbbell Floor Press", type: "Horizontal Pressing" },
  { title: "Barbell Floor Press", type: "Horizontal Pressing" },
  { title: "Push Up", type: "Horizontal Pressing" },
  { title: "Incline Push Up", type: "Horizontal Pressing" },
  { title: "Eccentric Push Up", type: "Horizontal Pressing" },
  { title: "Barbell Overhead Press", type: "Vertical Pressing" },
  { title: "Dumbell Overhead Press", type: "Vertical Pressing" },
  { title: "Seated Dumbell Overhead Press", type: "Vertical Pressing" },
  { title: "Barbell Push Press", type: "Vertical Pressing" },
  { title: "Dumbell Push Press", type: "Vertical Pressing" },
  { title: "Single-Arm Dumbbell Push Press", type: "Vertical Pressing" },
  { title: "Snatch Press", type: "Vertical Pressing" },
  { title: "Snatch Push Press", type: "Vertical Pressing" },
  { title: "Barbell Push Press", type: "Vertical Pressing" },
  { title: "Dumbbell Push Press", type: "Vertical Pressing" },
  { title: "Single Arm Dumbbell Push Press", type: "Vertical Pressing" },
  { title: "Alternating Dumbbell Shoulder Press", type: "Vertical Pressing" },
  { title: "Sots Press", type: "Vertical Pressing" },
  { title: "Arnold Press", type: "Vertical Pressing" },
  { title: "Half-Kneeling Single Arm Dumbell Press", type: "Vertical Pressing" },
  { title: "Half-kneeling Land Mine Press", type: "Vertical Pressing" },
  { title: "Single Arm Land Mine Press", type: "Vertical Pressing" },
  { title: "Military Press", type: "Vertical Pressing" },
  { title: "Cuban Press (Barbell)", type: "Vertical Pressing" },
  { title: "Cuban Press (Dumbell)", type: "Vertical Pressing" },
  { title: "Ring Dips", type: "Vertical Pressing" },
  { title: "Dips", type: "Vertical Pressing" },
  { title: "Dumbbell Row", type: "Horizontal Pulling" },
  { title: "Barbell Bent Over Row", type: "Horizontal Pulling" },
  { title: "Inverted Row (Supinated)", type: "Horizontal Pulling" },
  { title: "Inverted Row (Pronated)", type: "Horizontal Pulling" },
  { title: "Seated Cable Row", type: "Horizontal Pulling" },
  { title: "Seated Cable Row (Pronated)", type: "Horizontal Pulling" },
  { title: "Seated Cable Row (Rope)", type: "Horizontal Pulling" },
  { title: "Seated Cable Row (Supinated)", type: "Horizontal Pulling" },
  { title: "Single Arm Seated Cable Row", type: "Horizontal Pulling" },
  { title: "Ring Rows", type: "Horizontal Pulling" },
  { title: "TRX Rows", type: "Horizontal Pulling" },
  { title: "Pendlay Row", type: "Horizontal Pulling" },
  { title: "Dumbell Banch Pull", type: "Horizontal Pulling" },
  { title: "Barbell bench Pull", type: "Horizontal Pulling" },
  { title: "Feet Elvevated Inverted Row", type: "Horizontal Pulling" },
  { title: "Single Arm Cable Row (Pronated)", type: "Horizontal Pulling" },
  { title: "Single Arm Cable Row (Supinated)", type: "Horizontal Pulling" },
  { title: "Chest Suported Incline Row", type: "Horizontal Pulling" },
  { title: "DB Bent Over Row 1-Arm (Neutral)", type: "Horizontal Pulling" },
  { title: "DB Bent Over Row 1-Arm (Wide)", type: "Horizontal Pulling" },
  { title: "DB Bent Over Row 2-Arm (Alternating)", type: "Horizontal Pulling" },
  { title: "DB Bent Over Row 2-Arm (Neutral)", type: "Horizontal Pulling" },
  { title: "DB Bent Over Row 2-Arm (Wide)", type: "Horizontal Pulling" },
  { title: "Rings Inverted Row (Neutral)", type: "Horizontal Pulling" },
  { title: "Rings Inverted Row (Rotation)", type: "Horizontal Pulling" },
  { title: "Rings Inverted Row (Wide)", type: "Horizontal Pulling" },
  { title: "Rings Inverted Row 1-Arm", type: "Horizontal Pulling" },
  { title: "T-Bar Row", type: "Horizontal Pulling" },
  { title: "Rings Pull Ups (Neutral)", type: "Vertical Pulling" },
  { title: "Rings Pull Ups (Pronated)", type: "Vertical Pulling" },
  { title: "Rings Pull Ups (Supinated)", type: "Vertical Pulling" },
  { title: "Rings Pull Ups (Wide)", type: "Vertical Pulling" },
  { title: "Rope Climbs", type: "Vertical Pulling" },
  { title: "Towel Pull-ups", type: "Vertical Pulling" },
  { title: "Chin Up (overhand)", type: "Vertical Pulling" },
  { title: "Chin Up (underhand)", type: "Vertical Pulling" },
  { title: "Chin Up (netural)", type: "Vertical Pulling" },
  { title: "Lat Pull Down (Neutral)", type: "Vertical Pulling" },
  { title: "Lat Pull Down (Pronated)", type: "Vertical Pulling" },
  { title: "Lat Pull Down (Supinated)", type: "Vertical Pulling" },
  { title: "Lat Pull Down (Wide)", type: "Vertical Pulling" },
  { title: "Close Grip lat Pulldown", type: "Vertical Pulling" },
  { title: "Dumbbell Upright Row", type: "Vertical Pulling" },
  { title: "Barbell Upright Row", type: "Vertical Pulling" },
  { title: "Dumbbell Upright Row", type: "Vertical Pulling" },
  { title: "Barbell Upright Row", type: "Vertical Pulling" },
  { title: "Eccentric Chin Ups", type: "Vertical Pulling" },
  { title: "Barbell Curls", type: "Isolation" },
  { title: "Dumbbell Curls", type: "Isolation" },
  { title: "Alternating Dumbell Curls", type: "Isolation" },
  { title: "EZ Bar Curls", type: "Isolation" },
  { title: "Preacher Curls", type: "Isolation" },
  { title: "Cable Curls", type: "Isolation" },
  { title: "Hammer Curls", type: "Isolation" },
  { title: "Single Arm Cable Curls", type: "Isolation" },
  { title: "Tricep Push Down", type: "Isolation" },
  { title: "Overhead Tricep Extensions", type: "Isolation" },
  { title: "Skull Crushers", type: "Isolation" },
  { title: "Dumbbell Skull Crushers", type: "Isolation" },
  { title: "Rope Push Downs", type: "Isolation" },
  { title: "Single Arm Tricep Push Down", type: "Isolation" },
  { title: "Dumbell External Rotation", type: "Isolation" },
  { title: "Dumbell Internal Rotation", type: "Isolation" },
  { title: "Band External Rotation 0 Deg", type: "Isolation" },
  { title: "Band External Rotation 90 Deg", type: "Isolation" },
  { title: "Band Row to External Rotation 90 Deg", type: "Isolation" },
  { title: "Eccentric Band External Rotation 0 Deg", type: "Isolation" },
  { title: "Eccentric Band External Rotation 90 Deg", type: "Isolation" },
  { title: "Supine Eccentric External Roation 90 Deg", type: "Isolation" },
  { title: "Band High Row to Y", type: "Isolation" },
  { title: "TRX-Y's", type: "Isolation" },
  { title: "TRX-I's", type: "Isolation" },
  { title: "TRX-T's", type: "Isolation" },
  { title: "TRX-I,T,Y", type: "Isolation" },
  { title: "Cable Face Pull", type: "Isolation" },
  { title: "TRX Face Pull", type: "Isolation" },
  { title: "Band Face Pull", type: "Isolation" },
  { title: "Band Pull Apart", type: "Isolation" },
  { title: "Dumbbel Front Raise", type: "Isolation" },
  { title: "Dumbbell Lateral Raise", type: "Isolation" },
  { title: "Dumbbell Rear Delt Flys", type: "Isolation" },
  { title: "Dumbbell Flys", type: "Isolation" },
  { title: "Dumbbell Upright Row", type: "Isolation" },
  { title: "Alternating Dumbell Uprigth Row", type: "Isolation" },
  { title: "Band Overhead Y", type: "Isolation" },
  { title: "Handstand Hold", type: "Gymnastics" },
  { title: "Handstand Walk ", type: "Gymnastics" },
  { title: "Handstand Push Up ", type: "Gymnastics" },
  { title: "Bar Muscle Up", type: "Gymnastics" },
  { title: "Ring Muscle Up", type: "Gymnastics" },
  { title: "AB Rollout", type: "Abs" },
  { title: "Alternating Leg Raise", type: "Abs" },
  { title: "Leg Raises", type: "Abs" },
  { title: "Back Plank", type: "Abs" },
  { title: "Bird Dog", type: "Abs" },
  { title: "Cross Body Chop", type: "Abs" },
  { title: "Crunch", type: "Abs" },
  { title: "Dead Bug", type: "Abs" },
  { title: "Decline Sit-Up", type: "Abs" },
  { title: "Drangon Fly", type: "Abs" },
  { title: "Floor Wipers", type: "Abs" },
  { title: "Flutter Kicks", type: "Abs" },
  { title: "GHD Sit-Up", type: "Abs" },
  { title: "GHD Sit-Up Hold", type: "Abs" },
  { title: "Hanging Leg Raise", type: "Abs" },
  { title: "Hollow Body Hold", type: "Abs" },
  { title: "Hollow Body Rock", type: "Abs" },
  { title: "Jack Knife", type: "Abs" },
  { title: "TRX Jack Knife", type: "Abs" },
  { title: "Toes to Bar", type: "Abs" },
  { title: "L-Sit", type: "Abs" },
  { title: "Plank", type: "Abs" },
  { title: "Pallof Press", type: "Abs" },
  { title: "Plank March", type: "Abs" },
  { title: "Plank Pull-Through", type: "Abs" },
  { title: "Reverse Crunch", type: "Abs" },
  { title: "Rolling Pin", type: "Abs" },
  { title: "Russian Twist", type: "Abs" },
  { title: "Side Bend", type: "Abs" },
  { title: "Side Plank", type: "Abs" },
  { title: "Side Plank + Leg Lift", type: "Abs" },
  { title: "Side Plank Lift", type: "Abs" },
  { title: "Standing Twist", type: "Abs" },
  { title: "Star Side Plank", type: "Abs" },
  { title: "Super Man Hold", type: "Abs" },
  { title: "Sky Divers", type: "Abs" },
  { title: "V-Up", type: "Abs" },
  { title: "Windshield Wipers", type: "Abs" },
  { title: "Ab Mat Sit Up ", type: "Abs" },
  { title: "Box Jumps", type: "Jumps" },
  { title: "Burpee Broad Jump", type: "Jumps" },
  { title: "Burpee Box Jump ", type: "Jumps" },
  { title: "Burpee Box Jump Over", type: "Jumps" },
  { title: "Box Jump Over", type: "Jumps" },
  { title: "Skipping", type: "Jumps" },
  { title: "Double Unders", type: "Jumps" },
  { title: "Drop Jump ", type: "Jumps" },
  { title: "Depth Jump", type: "Jumps" },
  { title: "High Hurdle Jumps", type: "Jumps" },
  { title: "Low Hurdle Hop", type: "Jumps" },
  { title: "High Hurdle Hop", type: "Jumps" },
  { title: "Power Skip", type: "Jumps" },
  { title: "Pogo Hops", type: "Jumps" },
  { title: "Tuck Jump", type: "Jumps" },
  { title: "Split Squat Jumps", type: "Jumps" },
  { title: "Speed Skaters", type: "Jumps" },
  { title: "Lateral Box Jump", type: "Jumps" },
  { title: "Trap-Bar Jump", type: "Jumps" },
  { title: "Weighted Box Jumps", type: "Jumps" },
  { title: "Eccentric Box Jumps", type: "Jumps" },
  { title: "Seated Box Jumps", type: "Jumps" },
  { title: "Broard Jump", type: "Jumps" },
  { title: "Squat Jump", type: "Jumps" },
  { title: "Bounding", type: "Jumps" },
  { title: "Medicine Ball Chest Pass", type: "Throws" },
  { title: "Wall Balls", type: "Throws" },
  { title: "Sandbag Over The Shoulder", type: "Throws" },
  { title: "Chest Pass", type: "Throws" },
  { title: "Kneeling Chest Pass", type: "Throws" },
  { title: "Half Kneeling Chest Pass", type: "Throws" },
  { title: "Side to Side Pass", type: "Throws" },
  { title: "Seated Lateral Pass", type: "Throws" },
  { title: "Seated Shot Put", type: "Throws" },
  { title: "Wood Chop Throw", type: "Throws" },
  { title: "Slam", type: "Throws" },
  { title: "Split Stance Lateral Toss", type: "Throws" },
  { title: "Lateral Power Throw", type: "Throws" },
  { title: "Pitcher Throw", type: "Throws" },
  { title: "Single Leg Throw In", type: "Throws" },
  { title: "Over the Shoulder Toss", type: "Throws" },
  { title: "Single Step Shot Put", type: "Throws" },
  { title: "Front Facing Heave", type: "Throws" },
  { title: "Row", type: "Cardio" },
  { title: "Run", type: "Cardio" },
  { title: "Swim", type: "Cardio" },
  { title: "Bike", type: "Cardio" },
  { title: "Assult Bike", type: "Cardio" },
  { title: "Bike Erg", type: "Cardio" },
  { title: "Ski Erg", type: "Cardio" },
  { title: "Battle Ropes", type: "Cardio" }
];