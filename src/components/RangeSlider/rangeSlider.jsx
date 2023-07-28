import React from "react";
import { Slider, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
  slider: {
    color: theme.palette.primary.main,
  },
}));

const RangeSlider = ({ distance, setDistance }) => {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setDistance(newValue);
  };


  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Adjust Range (KM)
      </Typography>
      <Slider
        value={distance}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={1}
        max={5}
        step={0.1}
        classes={{ thumb: classes.slider, rail: classes.slider, track: classes.slider }}
        aria-labelledby="range-slider"
      />
      <Typography variant="body2">{distance} KM</Typography>
    </div>
  );
};

export default RangeSlider;
