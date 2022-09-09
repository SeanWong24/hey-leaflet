import { Component, Host, h, ComponentInterface, Prop, Watch, Element, Method } from '@stencil/core';
import { GeoJsonObject } from 'geojson';
import L from 'leaflet';
import { LayerElement, LayerType } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-geojson',
  styleUrl: 'hey-leaflet-geojson.css',
  shadow: true,
})
export class HeyLeafletGeojson implements ComponentInterface, LayerElement {
  private readonly MAP_ELEMENT_TAG = 'hey-leaflet-map';
  private readonly LAYER_CONTROL_ELEMENT_TAG = 'hey-leaflet-layer-control';

  private layerInstance: L.GeoJSON;

  private _containerElement: HTMLHeyLeafletMapElement | HTMLHeyLeafletLayerControlElement;
  private get containerElement() {
    const parentElement = this.hostElement?.parentElement;
    if (parentElement?.tagName === this.MAP_ELEMENT_TAG.toUpperCase()) {
      this._containerElement = parentElement as HTMLHeyLeafletMapElement;
    } else if (parentElement?.tagName === this.LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
      this._containerElement = parentElement as HTMLHeyLeafletLayerControlElement;
    }
    return this._containerElement;
  }

  @Element() hostElement: HTMLHeyLeafletGeojsonElement;

  @Prop() type: LayerType = 'overlay';
  @Prop() name: string = 'GeoJSON';
  @Prop() options?: L.GeoJSONOptions;

  @Prop() geojson: GeoJsonObject;

  @Watch('geojson')
  watchGeojsonChange() {
    this.createLayerInstance();
  }

  @Prop() active: boolean;

  @Watch('active')
  watchActiveChange(active: boolean) {
    if (this.containerElement?.tagName === this.LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
      (this.containerElement as HTMLHeyLeafletLayerControlElement).updateActiveStatus(this.layerInstance, active);
    }
  }

  constructor() {
    this.createLayerInstance();
  }

  async connectedCallback() {
    if (this.containerElement?.tagName === this.LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
      await (this.containerElement as HTMLHeyLeafletLayerControlElement)?.addLayer(this.layerInstance, this.name, this.type);
      this.watchActiveChange(this.active);
    } else if (this.containerElement?.tagName === this.MAP_ELEMENT_TAG.toUpperCase()) {
      const mapInstance = await (this.containerElement as HTMLHeyLeafletMapElement).getMapInstance();
      this.layerInstance?.addTo(mapInstance);
    }
  }

  async disconnectedCallback() {
    if (this.containerElement?.tagName === this.LAYER_CONTROL_ELEMENT_TAG.toUpperCase()) {
      (this.containerElement as HTMLHeyLeafletLayerControlElement).removeLayer(this.layerInstance);
    }
    this.layerInstance?.remove();
  }

  @Method()
  async getLayerInstance() {
    return this.layerInstance;
  }

  render() {
    return <Host></Host>;
  }

  private createLayerInstance() {
    this.layerInstance?.remove();
    this.layerInstance = L.geoJSON(this.geojson, this.options);
  }
}
