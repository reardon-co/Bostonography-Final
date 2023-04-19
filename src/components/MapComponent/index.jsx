import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import classes from './MapComponent.module.css';
import { MAP_BOUNDS, MAX_ZOOM, MIN_ZOOM } from '../../constants/mapConstants';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ zoomLevel, position, errorCount, setErrorCount }) => {
  const reloadAfterErrorThreshold = async () => {
    if (zoomLevel === 20) {
      window.location.reload(true);
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={MAX_ZOOM}
      className={classes.mapContainer}
      maxBounds={MAP_BOUNDS}
      zoomControl={false}
    >
      <MapController zoomLevel={zoomLevel} />
      <TileLayer
        url="https://s3.us-east-2.wasabisys.com/urbanatlases/39999059010825/tiles/{z}/{x}/{y}.png"
        attribution='<a href=\"https://leventhalmap.org\">Leventhal Map & Education Center</a> at the <a href=\"https://bpl.org\">Boston Public Library</a>'
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        eventHandlers={{ tileerror: async () => await reloadAfterErrorThreshold() }}
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

const MapController = ({ zoomLevel }) => {
  const map = useMap();
  map.setZoom(zoomLevel);
  map.dragging.disable();
  map.scrollWheelZoom.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  if (map.tap) map.tap.disable();
  return null;
};

export default MapComponent;
