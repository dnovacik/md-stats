
<template>
    <div class="map-container">
        <div id="map">
        </div>
    </div>
</template>

<script>
/// <reference path="../../typings/index.d.ts" />

    import L, {
        Map,
        TileLayer
    } from 'leaflet';
    import europeStatesJson from './../data/europe-states.geo.json';
    import geoJsonLayerStyle from './../constants/styles.js';

    export default {
        name: 'mapLeaflet',
        data() {
            return {
                leafletMap: null,
                europeGeoJson: '',
                europeStateGeoJson: '',
                defaultMapPositionSettings: {
                    center: [48, 19],
                    zoom: 4
                },
                isCentered: true,
                wmsLayers: ['cr_obce', 'sk_obce', 'sk_obce_v_zas'],
                layers: [
                    new TileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>'
                    }),
                ]
            }
        },
        methods: {
            handleMapClick(event) {
                console.log(event.latlng);
            },
            loadGeoJson() {
                if (this.europeGeoJson === '') {
                    this.europeGeoJson = L.geoJson(europeStatesJson, {
                        onEachFeature: (feature, layer) => {
                            layer.setStyle(geoJsonLayerStyle.defaultGeoStyle);

                            layer.on('mouseover', () => {
                                layer.setStyle(geoJsonLayerStyle.hoverGeoStyle);
                            });

                            layer.on('mouseout', () => {
                                layer.setStyle(geoJsonLayerStyle.defaultGeoStyle);
                            });

                            layer.on('click', () => {
                                if (this.leafletMap !== null) {
                                    this.leafletMap.fitBounds(layer.getBounds());
                                    this.isCentered = false;

                                    if (this.leafletMap.hasLayer(this.europeGeoJson)) {
                                        this.removeAllLayersExceptClickedOne(layer, this.europeGeoJson);
                                    }
                                }
                            });
                        }
                    });
                }
            },
            removeAllLayersExceptClickedOne(layer, layers) {
                if (this.leafletMap !== null) {
                    this.leafletMap.eachLayer((layer) => {
                        if (layer instanceof L.GeoJSON) {
                            this.leafletMap.removeLayer(layer);
                        }
                    });
                    this.leafletMap.addLayer(layer);
                }
            }
        },
        mounted() {
            this.loadGeoJson();

            let map = new Map('map', {
                center: this.defaultMapPositionSettings.center,
                zoom: this.defaultMapPositionSettings.zoom,
                layers: this.layers,
                scrollWheelZoom: false,
                dragging: false,
                zoomSnap: 0.1
            });

            this.leafletMap = map;

            this.$nextTick(() => {
                this.europeGeoJson.addTo(this.leafletMap);

                this.leafletMap.on('click', this.handleMapClick);
                this.leafletMap.on('contextmenu', (e) => {
                    e.originalEvent.preventDefault();

                    let mapZoom = this.leafletMap.getZoom();

                    if (mapZoom !== 4 || !this.isCentered) {
                        this.leafletMap.setView(this.defaultMapPositionSettings.center, this.defaultMapPositionSettings.zoom);
                        this.leafletMap.eachLayer((layer) => {
                            if (layer instanceof L.GeoJSON) {
                                this.leafletMap.removeLayer(layer);
                            }
                        });

                        this.europeGeoJson.addTo(this.leafletMap);
                        this.isCentered = true;
                    }

                    return false;
                })
            });
        }
    }
</script>

<style lang="scss">
.map-container {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;

    & > #map {
        height: calc(100% - 150px);
        width: 100%;
    }
}
    
</style>