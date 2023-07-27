import React, { useState } from "react";
import { Slider, Typography } from "@material-ui/core";

const RangeSlider = ({ rating, setRating }) => {
    const handleChange = (event, newValue) => {
      setRating(newValue);

  
  };

  return (
    <div>
      <Typography gutterBottom>Adjust Range (KM)</Typography>
      <Slider
       value={rating}
       onChange={handleChange}
       valueLabelDisplay="auto"
       min={1}
       max={5}
       step={0.1}
       aria-labelledby="range-slider"
      />
      <Typography variant="body2">{rating} KM</Typography>
    </div>
  );
};







  


export default RangeSlider;
