import Map from 'ol/Map';

export type TMapProps = Record<string, unknown>;

export type TMapState = {
  mapContext?: IMapContext;
};

export interface IMapContext {
  map: Map;
}
