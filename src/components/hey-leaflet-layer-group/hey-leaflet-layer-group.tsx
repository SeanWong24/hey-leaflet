import { Component, Host, h, ComponentInterface, Method, Prop, Watch, Element } from '@stencil/core';
import L from 'leaflet';
import { LayerContainerElement, LayerElement, LayerType, obtainLayerContainerElement, registerLayer, unregisterLayer, updateLayerActiveStatus } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-layer-group',
  styleUrl: 'hey-leaflet-layer-group.css',
  shadow: true,
})
export class HeyLeafletLayerGroup implements ComponentInterface, LayerElement {
  private layerInstance: L.LayerGroup;

  private _containerElement: LayerContainerElement;
  private get containerElement() {
    const containerElement = obtainLayerContainerElement(this.hostElement);
    if (containerElement) {
      this._containerElement = containerElement;
    }
    return this._containerElement;
  }

  @Element() hostElement: HTMLHeyLeafletLayerGroupElement;

  @Prop() type: LayerType = 'overlay';
  @Prop() name: string = 'Layer Group';
  @Prop() options?: L.LayerOptions;

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
    this.layerInstance = L.layerGroup([], this.options);
  }
}
