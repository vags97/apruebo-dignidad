<template>
  <div>
    <script v-html="jsonLd()" type="application/ld+json"></script>
    <v-card>
      <v-img
          src="/media/gabriel-boric.jpg"
          class="align-end"
      >
        <v-row justify="center">
          <v-col cols="12">
            <v-btn
                href="https://boricpresidente.cl"
                color="primary"
                class="align-center"
                block
                large
                target="_blank"
            >
              Conoce A Gabriel Boric Presidente
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ConoceBoric",
  methods:{
    jsonLd(){
      const jsonLd = this.$site.themeConfig.jsonLd;
      return {
        "@context": "https://schema.org/",
        ...jsonLd.boric,
        "worksFor": [
          jsonLd.chile,
          jsonLd.aprueboDignidad,
          jsonLd.convergenciaSocial,
          jsonLd.frenteAmplio
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
