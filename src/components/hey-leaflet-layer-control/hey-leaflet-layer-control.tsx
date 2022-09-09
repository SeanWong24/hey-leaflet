import { Component, Host, h, ComponentInterface, Element, Prop, Method } from '@stencil/core';
import L from 'leaflet';
import { LayerType } from '../../utils/layer-element';

export type LayerControlLayerDict = { [name: string]: string | globalThis.Element };
type LayerControlResolvedLayerDict = { [name: string]: L.Layer };

@Component({
  tag: 'hey-leaflet-layer-control',
  styleUrl: 'hey-leaflet-layer-control.css',
  shadow: true,
})
export class HeyLeafletLayerControl implements ComponentInterface {
  private readonly MAP_ELEMENT_TAG = 'hey-leaflet-map';

  private layerControlInstance: L.Control.Layers;
  private mapInstance?: L.Map;
  private reslovedBaseLayers: LayerControlResolvedLayerDict;
  private reslovedOverlays: LayerControlResolvedLayerDict;

  private get parentMapElement() {
    const parentElement = this.hostElement?.parentElement;
    if (parentElement.tagName === this.MAP_ELEMENT_TAG.toUpperCase()) {
      return parentElement as HTMLHeyLeafletMapElement;
    }
  }

  @Element() hostElement: HTMLHeyLeafletLayerControlElement;

  @Prop() options: L.Control.LayersOptions;

  constructor() {
    this.createLayerControlInstance();
  }

  async connectedCallback() {
    await this.addLayerControlInstanceToMap();
  }

  disconnectedCallback() {
    this.removeLayerControlInstanceFromMap();
  }

  @Method()
  async addLayer(layer: L.Layer, name: string, type: LayerType = 'overlay') {
    switch (type) {
      case 'base-layer':
        this.layerControlInstance?.addBaseLayer(layer, name);
        break;
      case 'overlay':
        this.layerControlInstance?.addOverlay(layer, name);
        break;
    }
  }

  @Method()
  async removeLayer(layer: L.Layer) {
    this.layerControlInstance?.removeLayer(layer);
  }

  @Method()
  async updateActiveStatus(layer: L.Layer, active: boolean = false) {
    if (!this.mapInstance) {
      setTimeout(() => {
        this.updateActiveStatus(layer, active);
      });
      return;
    }
    if (active) {
      layer?.addTo(this.mapInstance);
    } else {
      layer?.removeFrom(this.mapInstance);
    }
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
    this.layerControlInstance?.remove();
    this.layerControlInstance = L.control.layers(this.reslovedBaseLayers || {}, this.reslovedOverlays || {}, this.options);
  }
}
