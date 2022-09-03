<template>
  <v-row justify="center">
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
        <v-btn
          depressed
          color="secondary"
          block
          href="https://conteo.apruebodignidad.cl"
          target="_blank"
          large
        >
          <v-icon left large>
            {{ mdiArchive }}
          </v-icon>
          <strong>Herramienta de Conteo de Votos</strong>
        </v-btn>
      </v-col>
      <v-col cols="12" class="px-0">
        <DescargasSection/>
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
</template>

<script>
import mdToHtml from "../util/mdToHtml";
import NoticiasSection from "@theme/components/Home/NoticiasSection";
import ArticulosSection from "@theme/components/Home/ArticulosSection";
import ActividadesSection from "@theme/components/Home/ActividadesSection";
import HeroSection from "@theme/components/Home/HeroSection";
import DescargasSection from "../components/Home/DescargasSection";
import { mdiArchive } from '@mdi/js';

export default {
  name: 'Home',
  components: {
    HeroSection,
    NoticiasSection,
    ArticulosSection,
    ActividadesSection,
    DescargasSection
  },
  data() {
    return {
      mdiArchive,
      mdToHtml
    }
  },
  computed: {
    currentBreakpoint() {
      return this.$vuetify.breakpoint.name;
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


