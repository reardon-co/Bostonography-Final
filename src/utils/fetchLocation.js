import { MAP_BOUNDS } from "../constants/mapConstants";

export const fetchLocationData = async (latitiude, longitude) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitiude}&lon=${longitude}&format=json`);
    const json = await response.json()
    return json
}

export const fetchLocationFromSuburb = async (suburbName) => {
    const formattedSuburbName = suburbName.replace(" ", "+")
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formattedSuburbName},+boston&format=json`)
    const json = await response.json()
    return json
}


// Formula source: https://www.movable-type.co.uk/scripts/latlong.html
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
  
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Logic for random numbers found here: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
export const pickRandomCoordinates = () => {
    const lat = Math.random() * (MAP_BOUNDS[1][0] - MAP_BOUNDS[0][0]) + MAP_BOUNDS[0][0]
    const lon = Math.random() * (MAP_BOUNDS[1][1] - MAP_BOUNDS[0][1]) + MAP_BOUNDS[0][1]
    return [lat, lon]
}
