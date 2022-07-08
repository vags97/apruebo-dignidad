<template>
  <v-card flat color="#2fb083">
    <v-card-title class="text-h4 white--text">
      <v-icon color="white" left large>
        {{ mdiBookOpenPageVariant  }}
      </v-icon>
      Artículos de la Constitución
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="6"
            v-for="(articulo, index) in articulos.slice(0,4)"
            :key="index"
        >
          <ArticuloCard
              :title="articulo.title"
              :description="articulo.description"
              :image="articulo.image"
              :route="articulo.route"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
              to="/noticias"
              class="px-4 font-weight-bold white--text"
              color="#008ef6"
              tile
          >
            Ver todos los Artículos
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ArticuloCard from "../ArticuloCard";
import { mdiBookOpenPageVariant   } from '@mdi/js'
export default {
  name: "ArticulosSection",
  components: {
    ArticuloCard
  },
  props: {
    articulos: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      mdiBookOpenPageVariant
    }
  }
}
</script>

<style scoped>

</style>
