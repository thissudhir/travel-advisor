import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import {getPlaceData} from './Api'
import Header from "./components/header/header";

import Map from "./components/map/map";
import List from "./components/list/list";
import RangeSlider from "./components/RangeSlider/rangeSlider";
// import { Data } from '@react-google-maps/api';


const App = () => {
  
    const [places, setPlaces]=useState([]);
    const [coordinates, setCoordinates]=useState({});
    const [bounds, setBound]=useState({});
    const [childClicked, setChildClicked]=useState(null);
    const [isLoading, setIsLoading]=useState(false);
    const [type, setType]=useState('restaurants');
    const [rating, setRating]=useState('');
    const [filteredPlaces, setFilteredPlaces]=useState([]);
    const [distance, setDistance] = useState(5);

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

    //For fetching the rating
    useEffect(()=>{
      const filteredPlaces=places.filter((place)=>place.rating > rating);

      setFilteredPlaces(filteredPlaces)
    },[rating]);
    
    useEffect(() => {
      if(bounds.sw && bounds.ne){
        setIsLoading(true);
        console.log("this is coordi and bound",coordinates, bounds)
        getPlaceData(type, bounds.sw, bounds.ne)
          .then((data) => {
            console.log("Place data:", data);
            setPlaces(data?.filter((place)=>place.name && place.num_reviews >0));
            setFilteredPlaces([]);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching place data:", error);
          });
      }
  }, [type, bounds]);
  
  console.log("Palces",places)
  console.log("filteredPlaces",filteredPlaces)
  // console.log("Coordinates:", coordinates);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
        <RangeSlider
            distance={distance}
            setDistance={setDistance}
          />
          <List places={filteredPlaces.length ? filteredPlaces : places} 
                childClicked={childClicked} 
                isLoading={isLoading}
                type={type}
                rating={rating}
                setType={setType}
                setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
                setCoordinates={setCoordinates}
                setBound={setBound} 
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                distance={distance}

            />
                
        </Grid>
      </Grid>
    </>
  );
}

export default App;