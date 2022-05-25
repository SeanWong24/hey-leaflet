export interface LayerElement {
  getLayerInstance(): Promise<L.Layer>;
}
