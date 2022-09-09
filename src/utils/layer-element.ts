export type LayerType = 'base-layer' | 'overlay';

export interface LayerElement {
  type: LayerType;
  active: boolean;
  getLayerInstance(): Promise<L.Layer>;
}
