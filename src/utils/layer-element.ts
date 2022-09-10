const MAP_ELEMENT_TAG = 'hey-leaflet-map';
const LAYER_CONTROL_ELEMENT_TAG = 'hey-leaflet-layer-control';

export type LayerType = 'base-layer' | 'overlay';

export interface LayerElement {
  type: LayerType;
  active: boolean;
  getLayerInstance(): Promise<L.Layer>;
}

export function obtainContainerElement(hostElement: HTMLElement) {
  const parentElement = hostElement?.parentElement;
  if (parentElement?.tagName === MAP_ELEMENT_TAG.toUpperCase()) {
    return parentElement as HTMLHeyLeafletMapElement;
  } else if (parentElement?.tagName === LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
    return parentElement as HTMLHeyLeafletLayerControlElement;
  }
}

export function updateLayerActiveStatus(containerElement: HTMLElement, layerInstance: L.Layer, active: boolean = false) {
  if (containerElement?.tagName === LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
    (containerElement as HTMLHeyLeafletLayerControlElement).updateActiveStatus(layerInstance, active);
  }
}

export async function registerLayer(containerElement: HTMLElement, layerInstance: L.Layer, name?: string, type?: LayerType, active?: boolean) {
  if (containerElement?.tagName === LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
    await (containerElement as HTMLHeyLeafletLayerControlElement)?.addLayer(layerInstance, name, type);
    updateLayerActiveStatus(containerElement, layerInstance, active);
  } else if (containerElement?.tagName === MAP_ELEMENT_TAG.toUpperCase()) {
    const mapInstance = await (containerElement as HTMLHeyLeafletMapElement).getMapInstance();
    layerInstance?.addTo(mapInstance);
  }
}

export async function unregisterLayer(containerElement: HTMLElement, layerInstance: L.Layer) {
  if (containerElement?.tagName === LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
    (containerElement as HTMLHeyLeafletLayerControlElement).removeLayer(layerInstance);
  }
  layerInstance?.remove();
}
