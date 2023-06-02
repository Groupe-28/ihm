import { Box, Flex } from '@chakra-ui/react';
import { DrawCreateEvent } from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Geometry as DefaultGeometry, GeometryCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Map, {
  GeolocateControl,
  GeolocateControlRef,
  Marker,
} from 'react-map-gl';
import { useGeoObjects } from '../lib/api';
import DrawControl from './draw-control';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidmlrdG9yYmlsbGF1ZCIsImEiOiJjbGllazQ4cXQwNmJrM3B0NGJlazJlY3Q0In0.Gx4d9o-bn0Rm2lxAchu6kw';

export type WithoutGeometryCollection<T extends DefaultGeometry> =
  T extends GeometryCollection ? never : T;

type Geometry = WithoutGeometryCollection<DefaultGeometry>;

export function MapGl() {
  const { data } = useGeoObjects();

  const [viewState, setViewState] = React.useState({
    latitude: 48.7,
    longitude: 2.36,
    zoom: 18,
  });

  const [geometry, setGeometry] = React.useState<Geometry[]>([]);

  const geolocateControlRef = React.useRef<GeolocateControlRef>(null);

  const onCreate = (event: DrawCreateEvent) => {
    const { features } = event;

    if (features.length > 0) {
      const feature = features[0];
      const { geometry } = feature;
      if (geometry.type !== 'GeometryCollection') {
        setGeometry((prev) => [...prev, geometry]);
      }

      console.log(geometry);
    }
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Flex direction="column" className="w-full h-full p-3">
      <Box className="flex flex-row justify-start gap-3 items-center w-full p-3">
        {data &&
          data.length > 0 &&
          data.map((geoObject) => (
            <Box
              key={geoObject.id}
              className="flex flex-row justify-start gap-3 items-center w-full p-3"
            >
              {geoObject.type}
            </Box>
          ))}
      </Box>

      <Box className="relative w-full h-full rounded-lg">
        <Box className="absolute inset-0 rounded-lg">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
            mapStyle="mapbox://styles/viktorbillaud/cliekb2xi005001qv5b1ocahc"
            mapboxAccessToken={MAPBOX_TOKEN}
            onLoad={() => {
              geolocateControlRef.current?.trigger();
            }}
          >
            <DrawControl
              displayControlsDefault={false}
              onCreate={onCreate}
              controls={{
                polygon: true,
                trash: true,
                line_string: true,
              }}
            />

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
    </Flex>
  );
}
