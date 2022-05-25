/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface OhLeafletMap {
        "getMapInstance": () => Promise<L.Map>;
        "view": L.LatLngExpression;
        "zoom": number;
    }
    interface OhLeafletTileLayer {
        "options"?: L.TileLayerOptions;
        "urlTemplate": string;
    }
}
declare global {
    interface HTMLOhLeafletMapElement extends Components.OhLeafletMap, HTMLStencilElement {
    }
    var HTMLOhLeafletMapElement: {
        prototype: HTMLOhLeafletMapElement;
        new (): HTMLOhLeafletMapElement;
    };
    interface HTMLOhLeafletTileLayerElement extends Components.OhLeafletTileLayer, HTMLStencilElement {
    }
    var HTMLOhLeafletTileLayerElement: {
        prototype: HTMLOhLeafletTileLayerElement;
        new (): HTMLOhLeafletTileLayerElement;
    };
    interface HTMLElementTagNameMap {
        "oh-leaflet-map": HTMLOhLeafletMapElement;
        "oh-leaflet-tile-layer": HTMLOhLeafletTileLayerElement;
    }
}
declare namespace LocalJSX {
    interface OhLeafletMap {
        "view"?: L.LatLngExpression;
        "zoom"?: number;
    }
    interface OhLeafletTileLayer {
        "options"?: L.TileLayerOptions;
        "urlTemplate": string;
    }
    interface IntrinsicElements {
        "oh-leaflet-map": OhLeafletMap;
        "oh-leaflet-tile-layer": OhLeafletTileLayer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "oh-leaflet-map": LocalJSX.OhLeafletMap & JSXBase.HTMLAttributes<HTMLOhLeafletMapElement>;
            "oh-leaflet-tile-layer": LocalJSX.OhLeafletTileLayer & JSXBase.HTMLAttributes<HTMLOhLeafletTileLayerElement>;
        }
    }
}
