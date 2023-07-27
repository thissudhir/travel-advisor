import axios from 'axios';
import App from '../App';


export const getPlaceData= async (type, sw, ne)=>{
  try {
    console.log("Calling getPlaceData...");
	const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
 
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
      
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  });
	console.log("Data received:", data); 
  return data;
} 

catch (error) {
  console.error("Error fetching place data:", error);
  throw error; // Rethrow the error so it can be caught in the App.js component
}
}

