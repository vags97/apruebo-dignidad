<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card tile>
        <v-img
            :alt="'image' + data.title.toLowerCase().replace(' ', '_')"
            :src="data.image"
            max-height="500"
            contain
        />
        <v-card-title class="text-h5">
          {{ data.title}}
          <v-spacer/>
          <v-btn
              color="secondary"
              target="_blank"
              class="font-weight-bold"
              :href="`https://www.google.com/maps/search/?api=1&query=${ubicacion.lat},${ubicacion.lng}`"
          >
            Ver en Google Maps
          </v-btn>
        </v-card-title>
        <v-card-subtitle>
          {{ dateLocal(data.date) }} Hrs.
        </v-card-subtitle>
        <v-divider/>
        <v-card-subtitle>
          {{ data.description }}
        </v-card-subtitle>
        <v-divider/>
        <v-card-text>
          <Content />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <ActividadesSection
          :actividades="actividades"
      />
    </v-col>
  </v-row>
</template>

<script>
import ActividadesSection from "@theme/components/Home/ActividadesSection";

export default {
  name: 'Actividad',
  components: {
    ActividadesSection
  },
  computed: {
    data() {
      return this.$page.frontmatter
    },
    ubicacion(){
      const mdMeta = this.$page.frontmatter
      const ubicacionJson = mdMeta.ubicacion? JSON.parse(mdMeta.ubicacion): null;
      return  {
        lat: ubicacionJson? ubicacionJson.coordinates[1]: null,
        lng: ubicacionJson? ubicacionJson.coordinates[0]: null
      }
    },
    actividades () {
      return this.$site.themeConfig.actividades;
    },
  },
  methods:{
    dateLocal (dateTime) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
      return dateTime
          ? new Date(dateTime).toLocaleString('es-CL', options)
          : ''
    },
  }
}
</script>

<style lang="stylus">

.blog-info
  img
    max-width 100%

.blog-content
  max-width 1000px
  margin 0 auto

.blog
  padding $navbarHeight 2rem 0
  max-width 1000px
  margin 0 auto
  display block


</style>
