import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import IconLocation from '../IconLocation';

const Markers = (props) => {  
    const { places } = props;
    const markers = places.map((place, i) => (
        <Marker 
            key={i}
            position={[ place.lactitude, place.longitude ]}             
            icon={IconLocation}          
        >
             <Popup>
                 <h3>{place.name}</h3>
                 <p>{place.description}</p>
            </Popup>
        </Marker>        
    ));
    return markers
};

export default Markers;
