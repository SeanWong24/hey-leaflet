![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Hey-Leaflet

A web component wrapper for Leaflet.js.

## How to use

### Import

Simply put below code into `<head>` section of the HTML.

```html
<script type="module" src="https://seanwong24.github.io/hey-leaflet/build/hey-leaflet.esm.js"></script>
<script nomodule src="https://seanwong24.github.io/hey-leaflet/build/hey-leaflet.js"></script>
```

### Basics

The supported [Leaflet componenets](https://leafletjs.com/reference.html) are implemented as HTML elements, which can be added by using their corresponding tag names in the HTML. Some essential arguments are implemented as HTML attributes. The `options` of each Leaflet component can be set as the corresponding HTML element's `options` property. For example, assuming we have a map element like below:

```html
<hey-leaflet-map id="map"></hey-leaflet-map>
```

The `options` of the Leaflet map can be set like below:

```js
const mapElement = document.querySelector('#map');
mapElement.options = {
  preferCanvas: true,
};
```

### Container element

A container element can be a map element, a layer group element, or a layer control element.

### Create a map

The map element is a container for all other elements and it is required. `zoom` and `view` can be set as attributes.

```html
<hey-leaflet-map zoom="5" view="55 -113" style="width: 500px; height: 500px;"></hey-leaflet-map>
```

### Add a tile layer

Just add a tile layer element inside the container element. The `url-template` can be set as an attribute.

```html
<hey-leaflet-map zoom="5" view="55 -113" style="width: 500px; height: 500px;">
  <hey-leaflet-tile-layer url-template="https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg"></hey-leaflet-tile-layer>
</hey-leaflet-map>
```

### Add a GeoJSON layer

Just add a GeoJSON layer element inside the container element. The `geojson` object can be set as a property.

```html
<hey-leaflet-map zoom="5" view="55 -113" style="width: 500px; height: 500px;">
  <hey-leaflet-geojson id="geojson"></hey-leaflet-geojson>
</hey-leaflet-map>
```

```js
const geojsonElement = document.querySelector('#geojson');
// set a sample GeoJSON
geojsonElement.geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-121.28906250000001, 53.12040528310657],
            [-113.5546875, 53.12040528310657],
            [-113.5546875, 57.89149735271034],
            [-121.28906250000001, 57.89149735271034],
            [-121.28906250000001, 53.12040528310657],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [-110.390625, 57.136239319177434],
          [-117.42187500000001, 54.36775852406841],
          [-113.203125, 51.39920565355378],
          [-108.6328125, 53.12040528310657],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [-113, 55],
      },
    },
  ],
};
```

### Add a marker

Just add a marker element inside the container element. The `latlng` can be set as an attribute.

```html
<hey-leaflet-map zoom="5" view="55 -113" style="width: 500px; height: 500px;">
  <hey-leaflet-marker latlng="55 -114"></hey-leaflet-marker>
</hey-leaflet-map>
```

By using circle marker element, a circle marker can be added the same way like a marker.

```html
<hey-leaflet-map zoom="5" view="55 -113" style="width: 500px; height: 500px;">
  <hey-leaflet-circle-marker latlng="55 -112"></hey-leaflet-circle-marker>
</hey-leaflet-map>
```

### Add a layer group

Just add a layer group element inside the container element. Other layer elements can also be put into the layer group element instead of the map element.

```html
<hey-leaflet-layer-group>
  <!-- some layers that belong to this layer group -->
  <hey-leaflet-circle-marker latlng="55 -112"></hey-leaflet-circle-marker>
  <hey-leaflet-circle-marker latlng="56 -112"></hey-leaflet-circle-marker>
  <hey-leaflet-circle-marker latlng="57 -112"></hey-leaflet-circle-marker>
</hey-leaflet-layer-group>
```

### Add a layer control

Just add a layer control element inside the **map** element. Other layer elements and layer group elements can also be put into the layer control element instead of the map element. Layers inside the layer control element should specify the required `name` attribute and the optional `active` attribute.

```html
<hey-leaflet-map zoom="5" view="55 -113" style="width: 500px; height: 500px;">
  <hey-leaflet-layer-control id="layer-control">
    <hey-leaflet-tile-layer name="GW2" url-template="https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg"></hey-leaflet-tile-layer>
    <hey-leaflet-layer-group name="Markers">
      <hey-leaflet-marker latlng="55 -114"></hey-leaflet-marker>
      <hey-leaflet-marker latlng="56 -114"></hey-leaflet-marker>
      <hey-leaflet-marker latlng="57 -114"></hey-leaflet-marker>
    </hey-leaflet-layer-group>
    <hey-leaflet-layer-group name="Circle Markers">
      <hey-leaflet-circle-marker latlng="55 -112"></hey-leaflet-circle-marker>
      <hey-leaflet-circle-marker latlng="56 -112"></hey-leaflet-circle-marker>
      <hey-leaflet-circle-marker latlng="57 -112"></hey-leaflet-circle-marker>
    </hey-leaflet-layer-group> </hey-leaflet-layer-control
></hey-leaflet-map>
```
