import { Box } from '@chakra-ui/react';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Map, {
  GeolocateControl,
  GeolocateControlRef,
  Marker,
} from 'react-map-gl';
import DrawControl from './draw-control';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidmlrdG9yYmlsbGF1ZCIsImEiOiJjbGllazQ4cXQwNmJrM3B0NGJlazJlY3Q0In0.Gx4d9o-bn0Rm2lxAchu6kw';

export function MapGl() {
  const [viewState, setViewState] = React.useState({
    latitude: 48.7,
    longitude: 2.36,
    zoom: 18,
  });

  const geolocateControlRef = React.useRef<GeolocateControlRef>(null);

  return (
    <Box className="relative w-full h-full">
      <Box className="absolute inset-0">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/viktorbillaud/cliekb2xi005001qv5b1ocahc"
          mapboxAccessToken={MAPBOX_TOKEN}
          onLoad={() => {
            geolocateControlRef.current?.trigger();
          }}
        >
          <DrawControl />
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
            showUserLocation
            showAccuracyCircle
            ref={geolocateControlRef}
          />
          <Marker longitude={-122.4} latitude={37.8} color="red" />
        </Map>
      </Box>
    </Box>
  );
}
