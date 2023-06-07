import GPS from 'gps';

export function parseNMEA(data: string): GPS {
  let gps = new GPS();

  gps.update(data);
  return gps;
}
