import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';
import { markerIcon } from './IconLocation.js';

const MapView = ({ coordinates }) => {
    //se setean las coordenadas de la ong
    const coordsONG = {
        lat: '-34.597486832988814',
        lng: '-58.37740350239873'
    };

    //coordenadas que el mapa va a tomar como centro de la imagen
    const coordsCenter = {
        lat: '-34.5880643', lng: '-58.4615831'
    }

    return (
        <MapContainer center={{lat: coordsCenter.lat, lng: coordsCenter.lng}} zoom={12}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
            />
            <Marker position={{lat: coordsONG.lat, lng: coordsONG.lng}} 
               icon={markerIcon}>
                   <Popup className="pop-up-text">Ubicación de la ONG</Popup>
            </Marker>
            <Marker position={{lat: coordinates.latitude, lng: coordinates.longitude}} 
               icon={markerIcon}>
                   <Popup className="pop-up-text">Tu ubicación</Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapView;