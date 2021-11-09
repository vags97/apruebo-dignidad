<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <header class="hero">
        <v-carousel
            height="100%"
            hide-delimiters
            v-model="currentVideo"
        >
          <v-carousel-item
              v-for="(item,i) in videos"
              :key="i"
              reverse-transition="fade-transition"
              transition="fade-transition"
          >
            <video
                :ref="'heroVideo' + i"
                v-if="item.video && currentVideo===i"
                autoplay
                muted
                :src="item.video"
                controls
                style="width: 100%"
            >
              hola
            </video>
            <div
                class="overlay-video fade-out"
                :ref="'heroTitle' + i"
            >
              {{item.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </header>
      <Content  />
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
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
        <v-col
            cols="12"
            md="6"
            :order="['lg', 'md'].includes(this.currentBreakpoint) ? 'last':'first'"
        >
          <h1 class="pt-2">
            Noticias
          </h1>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="12"
                v-for="(noticia, index) in noticias"
                :key="index"
            >
              <HomeNoticiaCard
                  :title="noticia.title"
                  :description="noticia.description"
                  :image="noticia.image"
                  :route="noticia.route"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <a href="/noticias" class="px-4">
                Ver todos
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import mdToHtml from "../util/mdToHtml";
import {Timeline} from 'vue-tweet-embed'
import HomeNoticiaCard from "./NoticiaCard";

export default {
  name: 'Home',
  components: {HomeNoticiaCard, NavLink, Timeline },
  data() {
    return {
      mdToHtml,
      currentVideo: 0
    }
  },
  computed: {
    currentBreakpoint() {
      return this.$vuetify.breakpoint.name;
    },
    noticias () {
      return this.$site.themeConfig.noticias.slice(0,2);
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
    video(){
      return this.data.carruselVideo[this.currentVideo].video;
    },
  },
}
</script>

<style lang="stylus">
.overlay-video {
  position: absolute;
  top: 0;
  color: #FFF;
  text-align: center;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 10px 0;
  z-index: 2147483647;
}

.fade-out {
  opacity: 0;
  animation: fadeOut ease 8s;
  -webkit-animation: fadeOut ease 8s;
  -moz-animation: fadeOut ease 8s;
  -o-animation: fadeOut ease 8s;
  -ms-animation: fadeOut ease 8s;
}

@keyframes fadeOut {
 0% {
   opacity:1;
 }
 100% {
   opacity:0;
 }
}

@-moz-keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
