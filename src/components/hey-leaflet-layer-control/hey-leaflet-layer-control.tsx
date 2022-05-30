import { Component, Host, h, ComponentInterface, Element, Prop, Watch } from '@stencil/core';
import L from 'leaflet';
import { LayerElement } from '../../utils/layer-element';

export type LayerControlLayerDict = { [name: string]: string | globalThis.Element };
type LayerControlResolvedLayerDict = { [name: string]: L.Layer };

@Component({
  tag: 'hey-leaflet-layer-control',
  styleUrl: 'hey-leaflet-layer-control.css',
  shadow: true,
})
export class HeyLeafletLayerControl implements ComponentInterface {
  private readonly PARENT_MAP_ELEMENT_TAG = 'hey-leaflet-map';

  private layerControlInstance: L.Control.Layers;
  private mapInstance?: L.Map;
  private reslovedBaseLayers: LayerControlResolvedLayerDict;
  private reslovedOverlays: LayerControlResolvedLayerDict;

  private get parentMapElement() {
    const parentElement = this.hostElement?.parentElement;
    if (parentElement.tagName === this.PARENT_MAP_ELEMENT_TAG.toUpperCase()) {
      return parentElement as HTMLHeyLeafletMapElement;
    }
  }

  @Element() hostElement: HTMLHeyLeafletLayerControlElement;

  @Prop() baseLayers: LayerControlLayerDict;

  @Watch('baseLayers')
  async watchBaseLayerDictChange(baseLayers: LayerControlLayerDict) {
    const resolvedDictEntries = await Promise.all(
      Object.entries(baseLayers).map(async ([name, element]) => {
        if (typeof element === 'string') {
          element = this.parentMapElement.querySelector(element);
        }
        const layer = await (element as unknown as LayerElement).getLayerInstance();
        return [name, layer] as [string, L.Layer];
      }),
    );
    this.reslovedBaseLayers = Object.fromEntries(resolvedDictEntries);
    this.removeLayerControlInstanceFromMap();
    this.createLayerControlInstance();
    this.addLayerControlInstanceToMap();
  }

  @Prop() overlays: LayerControlLayerDict;

  @Watch('overlays')
  async watchOverlayDictChange(overlays: LayerControlLayerDict) {
    const resolvedEntries = await Promise.all(
      Object.entries(overlays).map(async ([name, element]) => {
        if (typeof element === 'string') {
          element = this.parentMapElement.querySelector(element);
        }
        const layer = await (element as unknown as LayerElement).getLayerInstance();
        return [name, layer] as [string, L.Layer];
      }),
    );
    this.reslovedOverlays = Object.fromEntries(resolvedEntries);
    this.removeLayerControlInstanceFromMap();
    this.createLayerControlInstance();
    this.addLayerControlInstanceToMap();
  }

  @Prop() options: L.Control.LayersOptions;

  async connectedCallback() {
    await this.addLayerControlInstanceToMap();
    this.watchBaseLayerDictChange(this.baseLayers);
    this.watchOverlayDictChange(this.overlays);
  }

  disconnectedCallback() {
    this.removeLayerControlInstanceFromMap();
  }

  render() {
    return <Host></Host>;
  }

  private async addLayerControlInstanceToMap() {
    this.mapInstance = await this.parentMapElement?.getMapInstance();
    this.layerControlInstance?.addTo(this.mapInstance);
  }

  private removeLayerControlInstanceFromMap() {
    this.layerControlInstance?.remove();
  }

  private createLayerControlInstance() {
    this.layerControlInstance = L.control.layers(this.reslovedBaseLayers || {}, this.reslovedOverlays || {}, this.options);
  }
}
