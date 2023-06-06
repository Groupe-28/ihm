import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { DrawCreateEvent } from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Geometry as DefaultGeometry, GeometryCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useCallback, useMemo, useRef } from 'react';
import Map, {
  GeolocateControl,
  GeolocateControlRef,
  Layer,
  MapRef,
  Source,
} from 'react-map-gl';
import { CreateGeoObjectModal } from '../components/geo/CreateGeoObjectModal';
import { GeoObjectPanel } from '../components/geo/GeoObjectPanel';
import { useGeoObjects } from '../lib/api';
import { GeoObject } from '../lib/types';
import DrawControl from './draw-control';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidmlrdG9yYmlsbGF1ZCIsImEiOiJjbGllazQ4cXQwNmJrM3B0NGJlazJlY3Q0In0.Gx4d9o-bn0Rm2lxAchu6kw';

export type WithoutGeometryCollection<T extends DefaultGeometry> =
  T extends GeometryCollection ? never : T;

type Geometry = WithoutGeometryCollection<DefaultGeometry>;

export function MapGl() {
  const { data, refetch } = useGeoObjects();
  const [selectedGeoObject, setSelectedGeoObject] = React.useState<
    GeoObject | undefined
  >(undefined);

  const [viewState, setViewState] = React.useState({
    latitude: 48.7,
    longitude: 2.36,
    zoom: 18,
  });

  const geolocateControlRef = React.useRef<GeolocateControlRef>(null);

  // CREATE GEO OBJECT MODAL
  const {
    isOpen: createGeoObjectModalIsOpen,
    onOpen: openGeoObjectModalOpen,
    onClose: closeGeoObjectModalOpen,
  } = useDisclosure();
  const [drawEventToHandle, setDrawEventToHandle] = React.useState<
    DrawCreateEvent | undefined
  >(undefined);

  React.useEffect(() => {
    if (drawEventToHandle) {
      openGeoObjectModalOpen();
    } else {
      closeGeoObjectModalOpen();
    }
  }, [drawEventToHandle]);

  // GEOJSON OBJECTS

  const geometries = useMemo(() => {
    if (!data) return null;

    const features: any = data.map((item) => ({
      type: 'Feature',
      geometry: {
        type: item.type,
        coordinates:
          item.type === 'Polygon'
            ? [item.points.map((point) => [point.latitude, point.longitude])]
            : item.points.map((point) => [point.latitude, point.longitude]),
      },
      properties: {
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
    }));

    console.log(features);

    return (
      <Source
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: features,
        }}
      >
        <Layer
          id="polygon-layer"
          type="fill"
          filter={['==', '$type', 'Polygon']}
          paint={{
            'fill-color': '#3AB2D0',
            'fill-outline-color': '#3AB2D0',
            'fill-opacity': 0.4,
          }}
        />
        <Layer
          id="line-layer"
          type="line"
          layout={{
            'line-cap': 'round',
            'line-join': 'round',
          }}
          paint={{
            'line-dasharray': [0.2, 2],
            'line-color': '#3AB2D0',
            'line-width': 3,
          }}
        />
        <Layer
          id="corner-circles"
          type="circle"
          paint={{
            'circle-radius': 6,
            'circle-color': '#3AB2D0',
          }}
        />
      </Source>
    );
  }, [data]);

  const mapRef = useRef<MapRef>(null);

  const onSelectCity = useCallback(
    ({ longitude, latitude }: { longitude: number; latitude: number }) => {
      mapRef.current?.flyTo({ center: [latitude, longitude], duration: 300 });
    },
    [],
  );

  const handleMapClick = useCallback(
    (e: mapboxgl.MapLayerMouseEvent) => {
      // find insides data if the click is inside a polygon
      const features = mapRef.current?.queryRenderedFeatures(e.point, {
        layers: ['polygon-layer', 'line-layer'],
      });

      features?.length &&
        setSelectedGeoObject(
          data?.find((item) => item.id === features?.[0].properties?.id) ||
            undefined,
        );
    },
    [data],
  );

  return (
    <Flex direction="row" className="w-full h-full p-3">
      <GeoObjectPanel
        geoObject={selectedGeoObject}
        isOpen={selectedGeoObject !== undefined}
        onClose={() => setSelectedGeoObject(undefined)}
      />
      <Box className="my-2 flex flex-col justify-start gap-3 items-center w-1/5 h-full">
        {data && data.length > 0 ? (
          data.map((geoObject) => (
            <Box
              key={geoObject.id}
              className="w-full flex flex-row justify-center gap-3 items-center px-3 py-3"
              onClick={() =>
                onSelectCity({
                  longitude: geoObject.points[0].longitude,
                  latitude: geoObject.points[0].latitude,
                })
              }
            >
              <Text fontWeight={'bold'} lineHeight={'10px'}>
                {geoObject.name}
              </Text>
              <Button
                onClick={() => setSelectedGeoObject(geoObject)}
                className="ml-auto"
              >
                Edit
              </Button>
            </Box>
          ))
        ) : (
          <Box>
            <Text>No data</Text>
          </Box>
        )}
      </Box>

      <Box className="relative w-full h-full rounded-lg">
        <Box className="absolute inset-0 rounded-lg">
          <Map
            {...viewState}
            ref={mapRef as React.RefObject<MapRef>}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              // border: '1px solid rgba(0,0,0,0.1)',
            }}
            mapStyle="mapbox://styles/viktorbillaud/cliekb2xi005001qv5b1ocahc"
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={['line-layer', 'polygon-layer']}
            onLoad={() => {
              geolocateControlRef.current?.trigger();
            }}
            onClick={handleMapClick}
          >
            <DrawControl
              displayControlsDefault={false}
              onCreate={(event) => setDrawEventToHandle(event)}
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
            {geometries}
          </Map>
          <CreateGeoObjectModal
            isOpen={createGeoObjectModalIsOpen}
            event={drawEventToHandle}
            onClose={() => {
              setDrawEventToHandle(undefined);
              closeGeoObjectModalOpen();
            }}
            onGeoObjectCreated={() => {
              setDrawEventToHandle(undefined);
              closeGeoObjectModalOpen();
              refetch();
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
}
