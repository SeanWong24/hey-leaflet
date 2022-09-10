import { Component, Host, h, ComponentInterface, Prop, Watch, Element, Method } from '@stencil/core';
import { GeoJsonObject } from 'geojson';
import L from 'leaflet';
import { LayerElement, LayerType, obtainContainerElement, registerLayer, unregisterLayer, updateLayerActiveStatus } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-geojson',
  styleUrl: 'hey-leaflet-geojson.css',
  shadow: true,
})
export class HeyLeafletGeojson implements ComponentInterface, LayerElement {
  private layerInstance: L.GeoJSON;

  private _containerElement: HTMLHeyLeafletMapElement | HTMLHeyLeafletLayerControlElement;
  private get containerElement() {
    const containerElement = obtainContainerElement(this.hostElement);
    if (containerElement) {
      this._containerElement = containerElement;
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
    updateLayerActiveStatus(this.containerElement, this.layerInstance, active);
  }

  constructor() {
    this.createLayerInstance();
  }

  async connectedCallback() {
    registerLayer(this.containerElement, this.layerInstance, this.name, this.type, this.active);
  }

  async disconnectedCallback() {
    unregisterLayer(this.containerElement, this.layerInstance);
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
