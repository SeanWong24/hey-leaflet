import { Component, Host, h, ComponentInterface, Prop, Watch, Element, Method } from '@stencil/core';
import L from 'leaflet';
import { LayerElement, LayerType, obtainContainerElement as obtainLayerContainerElement, registerLayer, unregisterLayer, updateLayerActiveStatus } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-tile-layer',
  styleUrl: 'hey-leaflet-tile-layer.css',
  shadow: true,
})
export class HeyLeafletTileLayer implements ComponentInterface, LayerElement {
  private layerInstance: L.TileLayer;

  private _containerElement: HTMLHeyLeafletMapElement | HTMLHeyLeafletLayerControlElement;
  private get containerElement() {
    const containerElement = obtainLayerContainerElement(this.hostElement);
    if (containerElement) {
      this._containerElement = containerElement;
    }
    return this._containerElement;
  }

  @Element() hostElement: HTMLHeyLeafletTileLayerElement;

  @Prop() type: LayerType = 'base-layer';
  @Prop() name: string = 'Tile';
  @Prop() urlTemplate!: string;

  @Watch('urlTemplate')
  watchUrlTemplateChange(urlTemplate: string) {
    this.layerInstance?.setUrl(urlTemplate);
  }

  @Prop() options?: L.TileLayerOptions;

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
    this.layerInstance = L.tileLayer(this.urlTemplate, this.options);
  }
}
