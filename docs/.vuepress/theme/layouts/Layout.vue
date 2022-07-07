<template>
  <div>
    <script v-html="jsonLd()" type="application/ld+json"></script>
    <v-app>
      <Navbar/>
      <v-main>
        <v-container fluid>
          <Contador/>
          <Home v-if="$page.frontmatter.home" />
          <Blogs v-else-if="$page.frontmatter.blogs" />
          <Articulos v-else-if="$page.frontmatter.articulos" />
          <Articulo v-else-if="$page.frontmatter.articulo" />
          <Actividad v-else-if="$page.frontmatter.actividad" />
          <Actividades v-else-if="$page.frontmatter.actividades" />
          <Blog v-else />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Footer from "@theme/components/Footer";
import Contador from "@theme/components/Contador";
import Blogs from "@theme/components/Noticias";
import Blog from '@theme/components/Noticia.vue'
import Articulos from "@theme/components/Articulos";
import Articulo from "@theme/components/Articulo";
import Actividades from "@theme/components/Actividades";
import Actividad from '@theme/components/Actividad';

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
    Actividad
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
