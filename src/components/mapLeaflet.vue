<template>
    <div class="map-container">
        <div id="map">
        </div>
    </div>
</template>

<script>
    import L, {
        Map,
        TileLayer
    } from 'leaflet';

    export default {
        name: 'mapLeaflet',
        data() {
            return {
                leafletMap: null,
                wmsLayers: ['cr_obce', 'sk_obce', 'sk_obce_v_zas'],
                layers: [
                    new TileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>'
                    })
                ]
            }
        },
        methods: {
            handleMapClick(event) {
                console.log(event.latlng);
            }
        },
        mounted() {
            let map = new Map('map', {
                center: [48, 19],
                zoom: 12,
                layers: this.layers,

            });

            this.leafletMap = map;

            this.$nextTick(() => {
                this.leafletMap.on('click', this.handleMapClick);
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