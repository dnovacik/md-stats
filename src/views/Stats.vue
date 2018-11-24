<template>
    <div>
        <section class="main">
            <div class="full-screen">
                <map-leaflet />
            </div>
        </section>
    </div>
</template>

<script>
    // @ is an alias to /src
    import mapLeaflet from '@/components/mapLeaflet';

    export default {
        name: 'Stats',
        components: {
            mapLeaflet
        }
    }
</script>

<style lang="scss">
    .main {
        &>.full-screen {
            width: 100%;
            min-height: calc(100vh - 134px);
        }
    }
</style>