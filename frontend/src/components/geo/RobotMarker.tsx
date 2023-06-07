import React from 'react';
import { Marker } from 'react-map-gl';
import { LocalizationData } from '../../lib/useRobotLocalization';

const RobotMarker: React.FC<{
  robotLocalization: LocalizationData;
}> = ({ robotLocalization }) => {
  return (
    <Marker
      longitude={robotLocalization.latitude}
      latitude={robotLocalization.longitude}
      anchor="bottom"
    >
      <span className="relative flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
      </span>
    </Marker>
  );
};

export default RobotMarker;
