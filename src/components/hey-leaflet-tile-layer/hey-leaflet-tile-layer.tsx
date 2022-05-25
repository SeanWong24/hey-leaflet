import { Component, Host, h, ComponentInterface, Prop, Watch, Element, Method } from '@stencil/core';
import L from 'leaflet';
import { LayerElement } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-tile-layer',
  styleUrl: 'hey-leaflet-tile-layer.css',
  shadow: true,
})
export class HeyLeafletTileLayer implements ComponentInterface, LayerElement {
  private readonly PARENT_MAP_ELEMENT_TAG = 'hey-leaflet-map';

  private tileLayerInstance: L.TileLayer;
  private mapInstance?: L.Map;

  private get parentMapElement() {
    const parentElement = this.hostElement?.parentElement;
    if (parentElement.tagName === this.PARENT_MAP_ELEMENT_TAG.toUpperCase()) {
      return parentElement as HTMLHeyLeafletMapElement;
    }
  }

  @Element() hostElement: HTMLHeyLeafletTileLayerElement;

  @Prop() urlTemplate!: string;

  @Watch('urlTemplate')
  watchUrlTemplateChange(urlTemplate: string) {
    this.tileLayerInstance?.setUrl(urlTemplate);
  }

  @Prop() options?: L.TileLayerOptions;

  @Watch('options')
  watchOptionsChange(options: L.TileLayerOptions) {
    this.tileLayerInstance.options = Object.assign(this.tileLayerInstance.options, options);
  }

  @Prop() active: boolean;

  @Watch('active')
  watchActiveChange(active: boolean) {
    if (active) {
      this.tileLayerInstance?.addTo(this.mapInstance);
    } else {
      this.tileLayerInstance?.remove();
    }
  }

  constructor() {
    this.tileLayerInstance = L.tileLayer(this.urlTemplate, this.options);
  }

  async connectedCallback() {
    this.mapInstance = await this.parentMapElement?.getMapInstance();
    if (this.active) {
      this.tileLayerInstance?.addTo(this.mapInstance);
    }
  }

  async disconnectedCallback() {
    this.tileLayerInstance?.remove();
  }

  @Method()
  async getLayerInstance() {
    return this.tileLayerInstance;
  }

  render() {
    return <Host></Host>;
  }
}
