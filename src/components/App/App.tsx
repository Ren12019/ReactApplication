import React from 'react';
import Calculation from '../calculation/Calculation';
import { Map } from '../map';
import MapPane from '../map/MapPane';

const App = () => (
  <div>
    <Calculation />
    <Map />
    <MapPane />
  </div>
);

export default App;
