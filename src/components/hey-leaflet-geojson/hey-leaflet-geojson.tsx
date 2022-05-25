import { Component, Host, h, ComponentInterface, Prop, Watch, Element, Method } from '@stencil/core';
import { GeoJsonObject } from 'geojson';
import L from 'leaflet';
import { LayerElement } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-geojson',
  styleUrl: 'hey-leaflet-geojson.css',
  shadow: true,
})
export class HeyLeafletGeojson implements ComponentInterface, LayerElement {
  private readonly PARENT_MAP_ELEMENT_TAG = 'hey-leaflet-map';

  private geoJSONInstance: L.GeoJSON;
  private mapInstance?: L.Map;

  private get parentMapElement() {
    const parentElement = this.hostElement?.parentElement;
    if (parentElement.tagName === this.PARENT_MAP_ELEMENT_TAG.toUpperCase()) {
      return parentElement as HTMLHeyLeafletMapElement;
    }
  }

  @Element() hostElement: HTMLHeyLeafletGeojsonElement;

  @Prop() geojson: GeoJsonObject;

  @Watch('geojson')
  watchGeojsonChange(geojson: GeoJsonObject) {
    this.geoJSONInstance = L.geoJSON(geojson);
    this.watchOptionsChange(this.options);
  }

  @Prop() options?: L.GeoJSONOptions;

  @Watch('options')
  watchOptionsChange(options: L.GeoJSONOptions) {
    this.geoJSONInstance.options = Object.assign(this.geoJSONInstance.options, options);
  }

  async connectedCallback() {
    this.watchGeojsonChange(this.geojson);
    this.mapInstance = await this.parentMapElement?.getMapInstance();
    this.geoJSONInstance?.addTo(this.mapInstance);
  }

  async disconnectedCallback() {
    this.geoJSONInstance?.remove();
  }

  @Method()
  async getLayerInstance() {
    return this.geoJSONInstance;
  }

  render() {
    return <Host></Host>;
  }
}
