import { Component, Host, h, ComponentInterface, Method, Prop, Watch, Element } from '@stencil/core';
import L from 'leaflet';
import { LayerElement, LayerContainerElement, obtainLayerContainerElement, LayerType, updateLayerActiveStatus, registerLayer, unregisterLayer } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-circle-marker',
  styleUrl: 'hey-leaflet-circle-marker.css',
  shadow: true,
})
export class HeyLeafletCircleMarker implements ComponentInterface, LayerElement {
  private layerInstance: L.CircleMarker;

  private _containerElement: LayerContainerElement;
  private get containerElement() {
    const containerElement = obtainLayerContainerElement(this.hostElement);
    if (containerElement) {
      this._containerElement = containerElement;
    }
    return this._containerElement;
  }

  private get actualLatLng() {
    const [lat, lng] = this.latlng.split(/\s+/).map(d => +d);
    return [lat, lng] as L.LatLngExpression;
  }

  @Element() hostElement: HTMLHeyLeafletMarkerElement;

  @Prop() type: LayerType = 'overlay';
  @Prop() name: string = 'Circle Marker';
  @Prop() options?: L.CircleMarkerOptions;

  @Prop() latlng!: string;

  @Watch('latlng')
  watchLatlngChange(_latlng: string) {
    this.layerInstance?.setLatLng(this.actualLatLng);
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
    this.layerInstance = L.circleMarker(this.actualLatLng, this.options);
  }
}
