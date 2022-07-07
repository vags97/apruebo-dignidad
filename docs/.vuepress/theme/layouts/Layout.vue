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
import Blog from '@theme/components/Noticia.vue'
import Footer from "../components/Footer";
import Blogs from "../components/Noticias";
import Contador from "../components/Contador";
import Articulos from "../components/Articulos";
import Articulo from "../components/Articulo";
import Actividades from "../components/Actividades";

export default {
  name: 'Layout',
  components: {
    Contador,
    Home,
    Blog,
    Navbar,
    Footer,
    Blogs,
    Articulos,
    Articulo,
    Actividades
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
