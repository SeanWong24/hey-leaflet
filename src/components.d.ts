/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { LayerType } from "./utils/layer-element";
import { GeoJsonObject } from "geojson";
export namespace Components {
    interface HeyLeafletGeojson {
        "active": boolean;
        "geojson": GeoJsonObject;
        "getLayerInstance": () => Promise<L.GeoJSON<any>>;
        "name": string;
        "options"?: L.GeoJSONOptions;
        "type": LayerType;
    }
    interface HeyLeafletLayerControl {
        "addLayer": (layer: L.Layer, name: string, type?: LayerType) => Promise<void>;
        "options": L.Control.LayersOptions;
        "removeLayer": (layer: L.Layer) => Promise<void>;
        "updateActiveStatus": (layer: L.Layer, active?: boolean) => Promise<void>;
    }
    interface HeyLeafletMap {
        "getMapInstance": () => Promise<L.Map>;
        "options": L.MapOptions;
        "view": string;
        "zoom": number;
    }
    interface HeyLeafletTileLayer {
        "active": boolean;
        "getLayerInstance": () => Promise<L.TileLayer>;
        "name": string;
        "options"?: L.TileLayerOptions;
        "type": LayerType;
        "urlTemplate": string;
    }
}
declare global {
    interface HTMLHeyLeafletGeojsonElement extends Components.HeyLeafletGeojson, HTMLStencilElement {
    }
    var HTMLHeyLeafletGeojsonElement: {
        prototype: HTMLHeyLeafletGeojsonElement;
        new (): HTMLHeyLeafletGeojsonElement;
    };
    interface HTMLHeyLeafletLayerControlElement extends Components.HeyLeafletLayerControl, HTMLStencilElement {
    }
    var HTMLHeyLeafletLayerControlElement: {
        prototype: HTMLHeyLeafletLayerControlElement;
        new (): HTMLHeyLeafletLayerControlElement;
    };
    interface HTMLHeyLeafletMapElement extends Components.HeyLeafletMap, HTMLStencilElement {
    }
    var HTMLHeyLeafletMapElement: {
        prototype: HTMLHeyLeafletMapElement;
        new (): HTMLHeyLeafletMapElement;
    };
    interface HTMLHeyLeafletTileLayerElement extends Components.HeyLeafletTileLayer, HTMLStencilElement {
    }
    var HTMLHeyLeafletTileLayerElement: {
        prototype: HTMLHeyLeafletTileLayerElement;
        new (): HTMLHeyLeafletTileLayerElement;
    };
    interface HTMLElementTagNameMap {
        "hey-leaflet-geojson": HTMLHeyLeafletGeojsonElement;
        "hey-leaflet-layer-control": HTMLHeyLeafletLayerControlElement;
        "hey-leaflet-map": HTMLHeyLeafletMapElement;
        "hey-leaflet-tile-layer": HTMLHeyLeafletTileLayerElement;
    }
}
declare namespace LocalJSX {
    interface HeyLeafletGeojson {
        "active"?: boolean;
        "geojson"?: GeoJsonObject;
        "name"?: string;
        "options"?: L.GeoJSONOptions;
        "type"?: LayerType;
    }
    interface HeyLeafletLayerControl {
        "options"?: L.Control.LayersOptions;
    }
    interface HeyLeafletMap {
        "options"?: L.MapOptions;
        "view"?: string;
        "zoom"?: number;
    }
    interface HeyLeafletTileLayer {
        "active"?: boolean;
        "name"?: string;
        "options"?: L.TileLayerOptions;
        "type"?: LayerType;
        "urlTemplate": string;
    }
    interface IntrinsicElements {
        "hey-leaflet-geojson": HeyLeafletGeojson;
        "hey-leaflet-layer-control": HeyLeafletLayerControl;
        "hey-leaflet-map": HeyLeafletMap;
        "hey-leaflet-tile-layer": HeyLeafletTileLayer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "hey-leaflet-geojson": LocalJSX.HeyLeafletGeojson & JSXBase.HTMLAttributes<HTMLHeyLeafletGeojsonElement>;
            "hey-leaflet-layer-control": LocalJSX.HeyLeafletLayerControl & JSXBase.HTMLAttributes<HTMLHeyLeafletLayerControlElement>;
            "hey-leaflet-map": LocalJSX.HeyLeafletMap & JSXBase.HTMLAttributes<HTMLHeyLeafletMapElement>;
            "hey-leaflet-tile-layer": LocalJSX.HeyLeafletTileLayer & JSXBase.HTMLAttributes<HTMLHeyLeafletTileLayerElement>;
        }
    }
}
