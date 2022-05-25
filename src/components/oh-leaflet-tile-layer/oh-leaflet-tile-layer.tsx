import { Component, Host, h, ComponentInterface, Prop, Watch, Element } from '@stencil/core';
import L from 'leaflet';

@Component({
  tag: 'oh-leaflet-tile-layer',
  styleUrl: 'oh-leaflet-tile-layer.css',
  shadow: true,
})
export class OhLeafletTileLayer implements ComponentInterface {
  private readonly PARENT_MAP_ELEMENT_TAG = 'oh-leaflet-map';

  private tileLayerInstance: L.TileLayer;
  private mapInstance?: L.Map;

  private get parentMapElement() {
    const parentElement = this.hostElement?.parentElement;
    if (parentElement.tagName === this.PARENT_MAP_ELEMENT_TAG.toUpperCase()) {
      return parentElement as HTMLOhLeafletMapElement;
    }
  }

  @Element() hostElement: HTMLOhLeafletTileLayerElement;

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

  constructor() {
    this.tileLayerInstance = L.tileLayer(this.urlTemplate, this.options);
  }

  async connectedCallback() {
    this.mapInstance = await this.parentMapElement?.getMapInstance();
    this.mapInstance?.addLayer(this.tileLayerInstance);
  }

  async disconnectedCallback() {
    this.mapInstance.removeLayer(this.tileLayerInstance);
  }

  render() {
    return <Host></Host>;
  }
}
