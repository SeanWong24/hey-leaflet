export interface LayerElement {
  active: boolean;
  getLayerInstance(): Promise<L.Layer>;
}
