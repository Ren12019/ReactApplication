import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { VectorLayer } from "./layers";
import { TMapProps, IMapContext, TMapState } from "./map-types";
import "ol/ol.css";
import "./map.css";

// const mapStyle: React.CSSProperties = {
//   'backgroundColor': '#282c34',
//   'minHeight': '100vh',
//   'display': 'flex',
//   'flexDirection': 'column',
//   'alignItems': 'center',
//   'justifyContent': 'center',
//   'fontSize': 'calc(10px + 2vmin)',
//   'color': 'white',
//   'height': '1px',
//   'width': '100%',
// }

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;

  state: TMapState = {};

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
    });

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext,
    });
  }


  render() {
    return (
      <div className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <VectorLayer />
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
