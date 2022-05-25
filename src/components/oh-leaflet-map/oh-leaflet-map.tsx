import { Component, Host, h, ComponentInterface, Method, Prop, Watch } from '@stencil/core';
import L from 'leaflet';

@Component({
  tag: 'oh-leaflet-map',
  styleUrl: 'oh-leaflet-map.css',
  shadow: true,
})
export class OhLeafletMap implements ComponentInterface {
  private containerElement: HTMLElement;
  private map: L.Map;

  @Prop() view: L.LatLngExpression = [0, 0];

  @Watch('view')
  watchViewChange(view: L.LatLngExpression) {
    this.map.setView(view);
  }

  @Prop() zoom: number = 6;

  @Watch('zoom')
  watchZoomChange(zoom: number) {
    debugger;
    this.map.setZoom(zoom);
  }

  componentDidLoad() {
    this.map = L.map(this.containerElement);
    this.initializeProps();
  }

  @Method()
  async getMapInstance() {
    return this.map;
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
