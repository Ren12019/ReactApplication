import React from 'react';
import Calculation from '../calculation/Calculation';
import MapPane from '../map-pane/MapPane';

const App = () => (
  <div>
    <h2>Calculation</h2>
    <Calculation />
    <h2>Map</h2>
    <MapPane />
  </div>
);

export default App;
