
<template>
    <div class="map-container">
        <loading :active.sync="isGettingData" :can-cancel="false" :is-full-page="false" :color="'#052de0'" />
        <div class="overlay" :class="{hidden: !isGettingData}"></div>
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
    import axios from 'axios';

    import europeStates from './../constants/europeStates.js';
    import { getClassifiedStyle } from './../constants/d3helpers.js';
    import { cloneObject } from './../utils/utils.js';
    import geoJsonLayerStyle from './../constants/styles.js';
    import './../utils/localStorageExtended.js';

    import europeStatesJson from './../data/europe-states.geo.json';

    // components
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'mapLeaflet',
        components: {
            Loading
        },
        data() {
            return {
                leafletMap: null,
                europeGeoJson: null,
                europeStateGeoJson: null,
                defaultMapPositionSettings: {
                    center: [48, 19],
                    zoom: 4
                },
                isGettingData: false,
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
                console.info(event.latlng);
            },
            handleError(message) {
                console.info(message);
            },
            loadEuropeGeoJson() {
                if (this.europeGeoJson === null) {
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
                                    this.isGettingData = true;
                                    this.leafletMap.fitBounds(layer.getBounds());
                                    this.isCentered = false;

                                    if (this.leafletMap.hasLayer(this.europeGeoJson)) {
                                        this.removeAllLayers();
                                        this.loadGeoJsonRegions(feature.properties.ids);
                                    }
                                }
                            });
                        }
                    });
                }

                this.europeGeoJson = cloneObject(this.europeGeoJson);
                this.europeGeoJson.addTo(this.leafletMap);
            },
            async loadGeoJsonRegions(stateId) {
                let regionJson = await this.getJsonForRegion(stateId);

                if (regionJson !== null && regionJson.geo !== null) {
                this.europeStateGeoJson = L.geoJSON(regionJson.geo, {
                    onEachFeature: (feature, layer) => {
                        layer.setStyle(geoJsonLayerStyle.defaultGeoStyle);

                        layer.on('mouseover', () => {
                            layer.setStyle(getClassifiedStyle(feature.properties.VYMERA_ha, 0, 990000));
                        });

                        layer.on('mouseout', () => {
                            layer.setStyle(geoJsonLayerStyle.defaultGeoStyle);
                        });
                    }
                });

                if (this.europeStateGeoJson !== null) {
                    this.europeStateGeoJson.addTo(this.leafletMap);
                    this.isGettingData = false;
                    }
                }
            },
            async getJsonForRegion(stateId) {
                let saved = localStorage.get(`regions.europe.${stateId}`);
                
                if (!saved) {
                    this.isGettingData = true;
                    await axios.get(`http://localhost:3000/api/regionsgj${stateId}`)
                        .then(res => {
                            if (res.data.valid) {
                                let state = europeStates[stateId];
                                state.geo = res.data.data;

                                let result = state;
                                localStorage.set(`regions.europe.${stateId}`, result);
                            } else {
                                this.handleError(res.data.error);
                            }
                            this.isGettingData = false;
                        })
                        .catch(err => {
                            this.handleError(err);
                            this.isGettingData = false;
                        });
                }
                   
                let regionJson = localStorage.get(`regions.europe.${stateId}`);

                return regionJson;
            },
            removeAllLayers() {
                this.europeStateGeoJson = null;

                if (this.leafletMap !== null) {
                    this.leafletMap.eachLayer((layer) => {
                        if (layer instanceof L.GeoJSON) {
                            this.leafletMap.removeLayer(layer);
                        }
                    });
                }
            }
        },
        mounted() {
            let map = new Map('map', {
                center: this.defaultMapPositionSettings.center,
                zoom: this.defaultMapPositionSettings.zoom,
                layers: this.layers,
                scrollWheelZoom: false,
                dragging: false,
                zoomSnap: 0.1,
                doubleClickZoom: false
            });

            this.leafletMap = map;

            this.$nextTick(() => {
                this.loadEuropeGeoJson();

                this.leafletMap.on('click', this.handleMapClick);
                this.leafletMap.on('contextmenu', (e) => {
                    e.originalEvent.preventDefault();

                    let mapZoom = this.leafletMap.getZoom();

                    if (mapZoom !== 4 || !this.isCentered) {
                        this.leafletMap.setView(this.defaultMapPositionSettings.center, this.defaultMapPositionSettings.zoom);
                        this.removeAllLayers();
                        this.loadEuropeGeoJson();
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