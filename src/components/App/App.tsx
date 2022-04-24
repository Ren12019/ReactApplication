import React from 'react';
import Calculation from '../calculation/Calculation';
import MapPane from '../map/MapPane';

const App = () => (
  <div>
    <Calculation />
    <h2>Map</h2>
    <MapPane />
  </div>
);

export default App;
