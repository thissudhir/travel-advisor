import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import {getPlaceData} from './Api'
import Header from "./components/header/header";

import Map from "./components/map/map";
import List from "./components/list/list";
import { Data } from '@react-google-maps/api';


const App = () => {
    const [places, setPlaces]=useState([]);
    const [coordinates, setCoordinates]=useState({});
    const [bounds, setBound]=useState({});
    const [childClicked, setChildClicked]=useState(null);
    const [isLoading, setIsLoading]=useState(false);

    // getting users geolocation on the start of the application 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    }, []);
    
    useEffect(() => {
      setIsLoading(true);
      console.log("this is coordi and bound",coordinates, bounds)
      getPlaceData(bounds.sw, bounds.ne)
        .then((data) => {
          console.log("Place data:", data);
          setPlaces(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching place data:", error);
        });
  }, [coordinates, bounds]);
  

  // console.log("Coordinates:", coordinates);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} 
                childClicked={childClicked} 
                isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
                setCoordinates={setCoordinates}
                setBound={setBound} 
                coordinates={coordinates}
                places={places}
                setChildClicked={setChildClicked}

            />
                
        </Grid>
      </Grid>
    </>
  );
}

export default App;
