<template>
  <v-card flat color="#f87519">
    <v-card-title class="text-h4 white--text">
      Actividades
      <v-spacer/>
      <v-btn
          to="/actividades"
          color="#008ef6"
          class="font-weight-bold"
          dark
          tile
      >
        Ver todas
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <MapaActividades
              :actividades="actividades"
          />
        </v-col>
        <v-col cols="12" md="6">
          <ActividadesHomeCard
              v-for="(actividad, index) in actividades.slice(0,3)"
              :key="index"
              :title="actividad.title"
              :description="actividad.description"
              :direccion="actividad.direccion"
              :organizador="actividad.organizador"
              :route="actividad.route"
              :date="actividad.date"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import MapaActividades from "../MapaActividades";
import ActividadesHomeCard from "./ActividadesHomeCard";
export default {
  name: "ActividadesSection",
  components: {ActividadesHomeCard, MapaActividades},
  props: {
    actividades: {
      type: Array,
      default: () =>[]
    }
  }
}
</script>

<style scoped>

</style>
