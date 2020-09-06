import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShown, setIsShown] = useState(false);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <div className="hoverable-area"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          {isShown && (
          <div>
            + New Workout
          </div>
        )}
        </div>
      </div>
      <Popover
        className="workout-form"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          <div className="workout-form">
            <FormControl className={classes.formControl}>
              <TextField required id="standard-required" label="Movement" />
              <br/>
              <FormControl className={classes.formControl}>
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
              </FormControl>
              <br/>
              <input onFocus={() => this.setState({show_overlay: true})} placeholder="Measurement Value" />
              <br/>
              <input onFocus={() => this.setState({show_overlay: true})} placeholder="Weight Metric" />
              <br/>
              <input onFocus={() => this.setState({show_overlay: true})} placeholder="placeholder" />
              <br/>
              <input onFocus={() => this.setState({show_overlay: true})} placeholder="Weight Value" />
            </FormControl>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
