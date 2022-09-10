import { Component, Host, h, ComponentInterface, Prop, Watch, Element, Method } from '@stencil/core';
import L from 'leaflet';
import { LayerElement, LayerType, obtainContainerElement, registerLayer, unregisterLayer, updateLayerActiveStatus } from '../../utils/layer-element';

@Component({
  tag: 'hey-leaflet-marker',
  styleUrl: 'hey-leaflet-marker.css',
  shadow: true,
})
export class HeyLeafletMarker implements ComponentInterface, LayerElement {
  private layerInstance: L.Marker;

  private _containerElement: HTMLHeyLeafletMapElement | HTMLHeyLeafletLayerControlElement;
  private get containerElement() {
    const containerElement = obtainContainerElement(this.hostElement);
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
  @Prop() name: string = 'Marker';
  @Prop() options?: L.MarkerOptions;

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
    this.layerInstance = L.marker(this.actualLatLng, this.options);
  }
}
