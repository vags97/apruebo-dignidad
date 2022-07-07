<template>
  <v-row justify="center">
    <v-col cols="0" md="1" lg="2" class="py-0"/>
    <v-col cols="12" md="10" lg="8">
      <v-row>
        <v-col cols="12" class="px-0">
          <HeroSection
              :videos="videos"
          />
        </v-col>
        <v-col
            cols="12"
            v-if="data.body"
        >
          <Content  />
        </v-col>
        <v-col cols="12" class="px-0">
          <NoticiasSection
              :noticias="noticias"
          />
        </v-col>
        <v-col cols="12" class="px-0">
          <ArticulosSection
              :articulos="articulos"
          />
        </v-col>
        <v-col cols="12" class="px-0">
          <ActividadesSection
              :actividades="actividades"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="9" lg="2">
      <Timeline
          class="twitter"
          v-if="twitter"
          :id="twitter"
          sourceType="profile"
          :options="{ tweetLimit: '3' }"
      >
        Cargado Twitter ...
      </Timeline>
    </v-col>
  </v-row>
</template>

<script>
import mdToHtml from "../util/mdToHtml";
import {Timeline} from 'vue-tweet-embed'
import NoticiasSection from "./Home/NoticiasSection";
import ArticulosSection from "./Home/ArticulosSection";
import ActividadesSection from "./Home/ActividadesSection";
import HeroSection from "./Home/HeroSection";

export default {
  name: 'Home',
  components: {
    HeroSection,
    NoticiasSection,
    ArticulosSection,
    ActividadesSection,
    Timeline
  },
  data() {
    return {
      mdToHtml
    }
  },
  computed: {
    currentBreakpoint() {
      return this.$vuetify.breakpoint.name;
    },

    twitter () {
      return this.$site.themeConfig.twitter;
    },
    data () {
      return this.$page.frontmatter
    },
    videos(){
      return this.data.carruselVideo;
    },
    noticias () {
      return this.$site.themeConfig.noticias.slice(0,3);
    },
    articulos () {
      return this.$site.themeConfig.articulos.slice(0,4);
    },
    actividades () {
      return this.$site.themeConfig.actividades;
    }
  },
}
</script>


