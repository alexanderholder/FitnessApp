import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Tabs from './components/Tabs'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function WorkoutDetails(props) {
  const [isShown, setIsShown] = useState(false);

  if (props.name) {
    return (
      <div>{props.name}</div>
    );
  } else{
    return (
      <div className="hoverable-area" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        {isShown &&(<div>+ New Workout</div>)}
      </div>
    );
  };
};

export default function WorkoutPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

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
        <WorkoutDetails name={props.name} />
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
          <Tabs workoutName={props.name} />
        </Typography>
      </Popover>
    </div>
  );
}
