<template>
  <div>
    <script v-html="jsonLd()" type="application/ld+json"></script>
    <v-app>
      <Navbar/>
      <v-main>
        <v-container fluid>
          <Contador ref="contador" id="contador"/>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="5" lg="2" order="2" order-lg="1" class="px-0 px-lg-2">
              <MusicLateral
                  :audios="currentAudios"
                  :playing.sync="playing"
                  :current-audio-id.sync="currentAudioId"
                  :current-audio-time.sync="currentAudioTime"
                  :current-audio-duration.sync="currentAudioDuration"
                  :current-audio="currentAudio"
                  style="z-index: 200"
              />
            </v-col>
            <v-col cols="12" md="10" lg="8" order="1" order-lg="2">
              <Home v-if="$page.frontmatter.home" />
              <Blogs v-else-if="$page.frontmatter.blogs" />
              <Articulos v-else-if="$page.frontmatter.articulos" />
              <Articulo v-else-if="$page.frontmatter.articulo" />
              <Actividad v-else-if="$page.frontmatter.actividad" />
              <Actividades v-else-if="$page.frontmatter.actividades" />
              <Blog v-else />
            </v-col>
            <v-col cols="12" sm="6" md="5" lg="2" order="3" order-lg="3">
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
        </v-container>
      </v-main>
      <MusicPlayer
          :audios="currentAudios"
          :playing.sync="playing"
          :current-audio-id.sync="currentAudioId"
          :current-audio-time.sync="currentAudioTime"
          :current-audio-duration.sync="currentAudioDuration"
          :current-audio="currentAudio"
          :current-audio-voz.sync="currentAudioVoz"
          style="z-index: 10"
      />
      <Footer class="pb-sm-16 pb-md-10" style="padding-bottom: 110px" />
    </v-app>
  </div>
</template>

<script>
import Home from '@theme/views/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Footer from "@theme/components/Footer";
import Contador from "@theme/components/Contador";
import Blogs from "@theme/views/Noticias";
import Blog from '@theme/views/Noticia.vue'
import Articulos from "@theme/views/Articulos";
import Articulo from "@theme/views/Articulo";
import Actividades from "@theme/views/Actividades";
import Actividad from '@theme/views/Actividad';
import {Timeline} from "vue-tweet-embed";
import MusicLateral from "../components/Music/MusicLateral";
import MusicPlayer from "../components/Music/MusicPlayer";

export default {
  name: 'Layout',
  components: {
    Home,
    Navbar,
    Footer,
    Contador,
    Blogs,
    Blog,
    Articulos,
    Articulo,
    Actividades,
    Actividad,
    Timeline,
    MusicPlayer,
    MusicLateral
  },
  data(){
    return {
      playing: false,
      currentAudioId: null,
      currentAudioTime: 0,
      currentAudioDuration: 0,
      currentAudioVoz: 'a',
      audios :{
        a: [
          { id: 1, name: 'Capítulo 1', url: 'https://ondacorta.cl/convencion/capitulo-1-es-US-Wavenet-A.mp3'},
          { id: 2, name: 'Capítulo 2', url: 'https://ondacorta.cl/convencion/capitulo-2-es-US-Wavenet-A.mp3'},
          { id: 3, name: 'Capítulo 3', url: 'https://ondacorta.cl/convencion/capitulo-3-es-US-Wavenet-A.mp3'},
          { id: 4, name: 'Capítulo 4', url: 'https://ondacorta.cl/convencion/capitulo-4-es-US-Wavenet-A.mp3'},
          { id: 5, name: 'Capítulo 5', url: 'https://ondacorta.cl/convencion/capitulo-5-es-US-Wavenet-A.mp3'},
          { id: 6, name: 'Capítulo 6', url: 'https://ondacorta.cl/convencion/capitulo-6-es-US-Wavenet-A.mp3'},
          { id: 7, name: 'Capítulo 7', url: 'https://ondacorta.cl/convencion/capitulo-7-es-US-Wavenet-A.mp3'},
          { id: 8, name: 'Capítulo 8', url: 'https://ondacorta.cl/convencion/capitulo-8-es-US-Wavenet-A.mp3'},
          { id: 9, name: 'Capítulo 9', url: 'https://ondacorta.cl/convencion/capitulo-9-es-US-Wavenet-A.mp3'},
          { id: 10, name: 'Capítulo 10', url: 'https://ondacorta.cl/convencion/capitulo-10-es-US-Wavenet-A.mp3'},
          { id: 11, name: 'Capítulo 11', url: 'https://ondacorta.cl/convencion/capitulo-11-es-US-Wavenet-A.mp3'},
          { id: 12, name: 'Disposiciones Transitorias', url: 'https://ondacorta.cl/convencion/disposiciones-transitorias-es-US-Wavenet-A.mp3'}
        ],
        b: [
          { id: 1, name: 'Capítulo 1', url: 'https://ondacorta.cl/convencion/capitulo-1-es-US-Wavenet-B.mp3'},
          { id: 2, name: 'Capítulo 2', url: 'https://ondacorta.cl/convencion/capitulo-2-es-US-Wavenet-B.mp3'},
          { id: 3, name: 'Capítulo 3', url: 'https://ondacorta.cl/convencion/capitulo-3-es-US-Wavenet-B.mp3'},
          { id: 4, name: 'Capítulo 4', url: 'https://ondacorta.cl/convencion/capitulo-4-es-US-Wavenet-B.mp3'},
          { id: 5, name: 'Capítulo 5', url: 'https://ondacorta.cl/convencion/capitulo-5-es-US-Wavenet-B.mp3'},
          { id: 6, name: 'Capítulo 6', url: 'https://ondacorta.cl/convencion/capitulo-6-es-US-Wavenet-B.mp3'},
          { id: 7, name: 'Capítulo 7', url: 'https://ondacorta.cl/convencion/capitulo-7-es-US-Wavenet-B.mp3'},
          { id: 8, name: 'Capítulo 8', url: 'https://ondacorta.cl/convencion/capitulo-8-es-US-Wavenet-B.mp3'},
          { id: 9, name: 'Capítulo 9', url: 'https://ondacorta.cl/convencion/capitulo-9-es-US-Wavenet-B.mp3'},
          { id: 10, name: 'Capítulo 10', url: 'https://ondacorta.cl/convencion/capitulo-10-es-US-Wavenet-B.mp3'},
          { id: 11, name: 'Capítulo 11', url: 'https://ondacorta.cl/convencion/capitulo-11-es-US-Wavenet-B.mp3'},
          { id: 12, name: 'Disposiciones Transitorias', url: 'https://ondacorta.cl/convencion/disposiciones-transitorias-es-US-Wavenet-B.mp3'}
        ]
      }
    }
  },
  computed: {
    twitter () {
      return this.$site.themeConfig.twitter;
    },
    currentAudios(){
      return this.audios[this.currentAudioVoz];
    },
    currentAudio(){
      const currentAudio = this.currentAudios.find(({id})=> id === this.currentAudioId)
      return currentAudio? currentAudio: { id: null, name: 'Seleccione', url: null}
    }
  },
  created() {
    if (typeof this.$ssrContext !== 'undefined') {
      this.$ssrContext.userHeadTags+=`<link rel='canonical' href='${this.$site.themeConfig.domain}${this.$page.path}'/>`;
    }
  },
  methods: {
    jsonLd(){
      const jsonLd = this.$site.themeConfig.jsonLd;
      return {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "id": "aprueboDignidadWebSite",
        "name": "Apruebo Dignidad",
        "url": "https://www.apruebo-dignidad.cl",
        "countryOfOrigin": "Chile",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.apruebo-dignidad.cl/candidatos.html?comuna={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        '@graph': [
          {
            ...jsonLd.aprueboDignidad,
            "worksFor": [
              jsonLd.boric,
              jsonLd.chile,
              jsonLd.aprueboDignidad,
              jsonLd.convergenciaSocial,
              jsonLd.frenteAmplio,
              jsonLd.convencion
            ]
          }
        ]
      }
    }
  }
}
</script>

<style>
.timer{
  width: 100px;
}
</style>
