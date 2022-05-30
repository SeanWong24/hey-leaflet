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

  @Prop() options?: L.GeoJSONOptions;

  @Prop() geojson: GeoJsonObject;

  @Watch('geojson')
  watchGeojsonChange() {
    this.createGeoJSONInstance();
  }

  @Prop() active: boolean;

  @Watch('active')
  watchActiveChange(active: boolean) {
    if (active) {
      this.geoJSONInstance?.addTo(this.mapInstance);
    } else {
      this.geoJSONInstance?.remove();
    }
  }

  async connectedCallback() {
    this.createGeoJSONInstance();
    this.mapInstance = await this.parentMapElement?.getMapInstance();
    if (this.active) {
      this.geoJSONInstance?.addTo(this.mapInstance);
    }
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

  private createGeoJSONInstance() {
    this.geoJSONInstance = L.geoJSON(this.geojson, this.options);
  }
}
