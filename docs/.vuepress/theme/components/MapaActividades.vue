<template>
  <div id="map-wrap" class="map-container">
    <component
        v-if="LMap"
        :is="LMap"
        ref="mapaEventos"
        :zoom.sync="zoom"
        :center.sync="center"
        :options="{zoomSnap: 0.1}"
        class="map"
    >
      <component
          v-if="LTileLayer"
          :is="LTileLayer"
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <component
          v-if="LMarker"
          :is="LMarker"
          v-for="(actividad, index) in actividades"
          :key="index"
          :lat-lng="[actividad.ubicacion.lat, actividad.ubicacion.lng]"
      >
        <component
            v-if="LPopup"
            :is="LPopup">
          <strong>{{ actividad.title }}</strong>
          <br>
          <strong>Fecha:</strong> {{ date(actividad.date) }} Hrs.
          <div v-if="actividad.direccion">
            <strong>Direccion:</strong> {{ actividad.direccion }}
          </div>
          <strong>Organizador:</strong> {{ actividad.organizador }}
          <br>
          <v-btn
              text
              color="primary"
              :to="actividad.route"
              class="pa-0"
              small
          >
            Ver Detalle
          </v-btn>
          <br>
          <a
              target="_blank"
              :href="`https://www.google.com/maps/search/?api=1&query=${actividad.ubicacion.lat},${actividad.ubicacion.lng}`"
          >
            Ver en Google Maps
          </a>
        </component>
      </component>
    </component>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';



export default {
  name: "MapaActividades",
  props: {
    actividades: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      center: [-33.4449058, -70.654855],
      zoom: 10,
      LMap: null,
      LMarker: null,
      LTileLayer: null,
      LPopup: null
    }
  },
  mounted(){
    import('vue2-leaflet').then(module => {
      this.LMap = module.LMap;
      this.LMarker = module.LMarker;
      this.LTileLayer = module.LTileLayer;
      this.LPopup = module.LPopup;
    })
    import('leaflet').then(module => {
      const Icon = module.Icon;
      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });
    })
  },
  methods: {
    date (dateTime) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      return dateTime
          ? new Date(dateTime).toLocaleString('es-CL', options)
          : ''
    },
  }
}
</script>

<style scoped>
.map-container {
  height: 350px;
}
.map {
  z-index:1;
}
</style>
