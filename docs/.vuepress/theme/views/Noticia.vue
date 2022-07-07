<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card tile>
        <v-img
            :alt="'image' + data.title.toLowerCase().replace(' ', '_')"
            :src="data.image"
            max-height="500"
            contain
        />
        <v-card-title class="text-h5">
          {{ data.title}}
        </v-card-title>
        <v-card-subtitle>
          {{ dateLocal(data.date) }} Hrs.
        </v-card-subtitle>
        <v-divider/>
        <v-card-subtitle>
          {{ data.description }}
        </v-card-subtitle>
        <v-divider/>
        <v-card-text>
          <Content />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="10" md="8" lg="7">
      <NoticiasSection
          :noticias="noticias"
      />
    </v-col>
  </v-row>
</template>

<script>
import NoticiasSection from "@theme/components/Home/NoticiasSection";

export default {
  name: 'Noticia',
  components: {
    NoticiasSection
  },
  computed: {
    data() {
      return this.$page.frontmatter
    },
    noticias () {
      return this.$site.themeConfig.noticias.slice(0,3);
    },
  },
  methods:{
    dateLocal (dateTime) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
      return dateTime
          ? new Date(dateTime).toLocaleString('es-CL', options)
          : ''
    },
  }
}
</script>

<style lang="stylus">

.blog-info
  img
    max-width 100%

.blog-content
  max-width 1000px
  margin 0 auto

.blog
  padding $navbarHeight 2rem 0
  max-width 1000px
  margin 0 auto
  display block


</style>
