<template>
  <div>
    <script v-html="jsonLd()" type="application/ld+json"></script>
    <v-app>
      <Navbar/>
      <v-main>
        <v-container class="py-6" fluid>
          <Home v-if="$page.frontmatter.home" />
          <Candidatos v-else-if="$page.frontmatter.candidatos" />
          <Blogs v-else-if="$page.frontmatter.blogs" />
          <Candidato v-else-if="$page.frontmatter.diputado || $page.frontmatter.core || $page.frontmatter.senador" />
          <Blog v-else />>
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
import Candidatos from "../components/Candidatos";
import Candidato from "../components/Candidato";

export default {
  name: 'Layout',
  components: {
    Candidatos,
    Candidato,
    Home,
    Blog,
    Navbar,
    Footer,
    Blogs
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
          jsonLd.aprueboDignidad,
          {
            ...jsonLd.boric,
            "worksFor": [
              jsonLd.chile,
              jsonLd.aprueboDignidad,
              jsonLd.convergenciaSocial,
              jsonLd.frenteAmplio
            ]
          }
        ]
      }
    }
  }
}
</script>
