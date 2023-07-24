import axios from 'axios';
import App from '../App';

const URL='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getPlaceData= async (sw, ne)=>{
  try {
    console.log("Calling getPlaceData...");
	const {data: {data}} = await axios.get(URL,{
 
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
      
    },
    headers: {
      'X-RapidAPI-Key': '16298e9fdfmsh868ce7f98d5f407p171d60jsn748e1134ec11',
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

