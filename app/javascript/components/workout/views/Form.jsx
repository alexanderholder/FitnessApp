import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
import SearchCreate from '../components/SearchCreate'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className="workout-form">
      <SearchCreate label="Excercise Name" value={props.excerciseName} />
      <SearchCreate label="For" />
      <SearchCreate label="Measurement Value" />
      <SearchCreate label="of excercise" />
      <SearchCreate label="Weight Value" />
      {/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="measurement_metric">For</InputLabel>
        <Select
          native
          value={state.for}
          onChange={handleChange}
          inputProps={{
            name: 'for',
            id: 'measurement_metric',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"cals"}>cals</option>
          <option value={"reps"}>reps</option>
          <option value={"distance"}>distance</option>
          <option value={"time"}>time</option>
          <option value={"max"}>max</option>
        </Select>
      </FormControl> */}
      {/* <TextField required id="standard-required" label="Measurement Value" />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="weight_metric">weight metric</InputLabel>
        <Select
          native
          value={state.for}
          onChange={handleChange}
          inputProps={{
            name: 'weight metric',
            id: 'weight_metric',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"kg"}>kg</option>
          <option value={"lbs"}>lbs</option>
          <option value={"%"}>%</option>
          <option value={"RPE"}>RPE</option>
          <option value={"% of movement"}>% of movement</option>
        </Select>
      </FormControl> */}
      {/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="of_excercise">of excercise</InputLabel>
        <Select
          native
          value={state.for}
          onChange={handleChange}
          inputProps={{
            name: 'of excercise',
            id: 'of_excercise',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"legs"}>legs</option>
          <option value={"back"}>back</option>
          <option value={"chest"}>chest</option>
          <option value={"abs"}>abs</option>
          <option value={"other legs"}>other legs</option>
        </Select>
      </FormControl> */}
      {/* <TextField required id="standard-required" label="Weight Value" /> */}
    </div>
  );
}