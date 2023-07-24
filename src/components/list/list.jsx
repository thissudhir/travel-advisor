import React, {useState, useEffect, createRef} from "react";
import { Typography, Grid, CircularProgress, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import useStyles from './style';

import PlaceDetails from "../placeDetails/placeDetails";

const List=({places, childClicked})=>{
    const classes=useStyles();
    const [type, setType]=useState('restaurants');
    const [rating, setRating]=useState('');

    // const renderedPlaces = place;
    return (
        <div className={classes.container}>
             <Typography variant="h4">Resturants, hotels & attractions around you</Typography>
             <FormControl className={classes.formControl}>
                 <InputLabel>Type</InputLabel>
                 <Select value={type} onChange={(event)=>setType(event.target.value)}>
                     <MenuItem value="restaurants">Restaurants</MenuItem>
                     <MenuItem value="hotels">Hotels</MenuItem>
                     <MenuItem value="attraction">Attractions</MenuItem>
                 </Select>
             </FormControl>
             <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(event)=>setRating(event.target.value)}>
                    <MenuItem value={0}>ALL</MenuItem>
                   <MenuItem value={3}>Above 3.0</MenuItem>
                   <MenuItem value={4}>Above 4.0</MenuItem>
                   <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places.map((place, i) => (
                    <Grid item key={i} xs={12}>
                      <PlaceDetails place={place}/> 
                    </Grid>     
                ))}
            </Grid>
       </div>
    )
    
}
export default List;