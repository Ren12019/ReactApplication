import React, { useEffect, useState } from 'react';
// OpenLayers?¿½Ç‚Ýï¿½?¿½?¿½
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OlSourceOSM from 'ol/source/OSM';

import 'ol/ol.css';

const MapPane = () => {
  const [map, setMap] = useState<Map>();

  // on component mount
  useEffect(() => {
    const mapObject = new Map({
      view: new View({
        center: fromLonLat([139.767, 35.681]),
        zoom: 14,
      }),
      layers: [
        new TileLayer({
          source: new OlSourceOSM(),
        }),
      ],
      target: 'map',
    });

    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  return <div style={{'height': '600px'}} id="map" />;
};

export default MapPane;
