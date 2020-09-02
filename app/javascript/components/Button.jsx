// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isShown, setIsShown] = React.useState(false);

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
      <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        {isShown && ( <div> + New Workout </div> )}
      </div>
      <Popover
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
          <input onFocus={() => this.setState({show_overlay: true})} placeholder="Movement" />
          <br/>
          {/* <FormControl>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </FormControl>
          <br/> */}
          <input onFocus={() => this.setState({show_overlay: true})} placeholder="Measurement Value" />
          <br/>
          <input onFocus={() => this.setState({show_overlay: true})} placeholder="Weight Metric" />
          <br/>
          <input onFocus={() => this.setState({show_overlay: true})} placeholder="placeholder" />
          <br/>
          <input onFocus={() => this.setState({show_overlay: true})} placeholder="Weight Value" />
          {/* <input
            type="text"
            name="name"
            placeholder="Name"
            // value={this.state.item.name}
            // onChange={this.changeHandler}
          /> */}
        </Typography>
      </Popover>
    </div>
  );
}
