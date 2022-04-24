import Map from 'ol/Map';
import Feature from 'ol/Feature';

export type TVectorLayerProps = Record<string, unknown>;

export type TVectorLayerComponentProps = TVectorLayerProps & {
  map: Map;
  features?: Feature[];
};
