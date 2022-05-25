import { Component, Host, h, ComponentInterface, Method, Prop, Watch } from '@stencil/core';
import L from 'leaflet';

@Component({
  tag: 'oh-leaflet-map',
  styleUrl: 'oh-leaflet-map.css',
  shadow: true,
})
export class OhLeafletMap implements ComponentInterface {
  private containerElement: HTMLElement;
  private mapInstance: L.Map;

  @Prop() view: L.LatLngExpression = [0, 0];

  @Watch('view')
  watchViewChange(view: L.LatLngExpression) {
    this.mapInstance.setView(view);
  }

  @Prop() zoom: number = 6;

  @Watch('zoom')
  watchZoomChange(zoom: number) {
    this.mapInstance.setZoom(zoom);
  }

  componentDidLoad() {
    this.mapInstance = L.map(this.containerElement);
    this.initializeProps();
  }

  @Method()
  async getMapInstance() {
    return this.mapInstance;
  }

  render() {
    return (
      <Host>
        <div part="container" ref={el => (this.containerElement = el)}></div>
      </Host>
    );
  }

  private initializeProps() {
    this.watchViewChange(this.view);
    this.watchZoomChange(this.zoom);
  }
}
