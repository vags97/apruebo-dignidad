<template>
  <v-card flat color="#008ef6">
    <v-card-title class="text-h4 white--text">
      Noticias
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(noticia, index) in noticias"
            :key="index"
        >
          <HomeNoticiaCard
              :title="noticia.title"
              :description="noticia.description"
              :image="noticia.image"
              :route="noticia.route"
              :date="noticia.date"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
              to="/noticias"
              class="px-4 font-weight-bold white--text"
              color="#2fb083"
              tile
          >
            Ver todas las Noticias
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import HomeNoticiaCard from "../NoticiaCard";

export default {
  name: "NoticiasSection",
  components: {
    HomeNoticiaCard
  },
  props: {
    noticias: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
