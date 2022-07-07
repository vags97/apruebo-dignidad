<template>
  <div>
    <script v-html="jsonLd()" type="application/ld+json"></script>
    <v-app>
      <Navbar/>
      <v-main>
        <v-container fluid>
          <Contador/>
          <v-row justify="center">
            <v-col cols="0" sm="6" md="5" lg="2" class="py-0" order="2" order-lg="1"/>
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
      <Footer />
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
    Timeline
  },
  computed: {
    twitter () {
      return this.$site.themeConfig.twitter;
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
