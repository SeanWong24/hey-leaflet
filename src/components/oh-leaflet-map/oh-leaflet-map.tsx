import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'oh-leaflet-map',
  styleUrl: 'oh-leaflet-map.css',
  shadow: true,
})
export class OhLeafletMap implements ComponentInterface {
  render() {
    return (
      <Host>
        <div style={{ width: '100%', height: '100%', border: '1px solid black' }}></div>
      </Host>
    );
  }
}
