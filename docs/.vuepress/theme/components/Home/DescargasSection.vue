<template>
  <div>
  <v-row>
    <v-col cols="12" md="6">
      <v-card
          href="https://www.chileconvencion.cl/wp-content/uploads/2022/07/Texto-CPR-2022.pdf"
          target="_blank"
          flat
      >
        <v-img
            :src="'/media/ad-descarga-propuesta-constitucion.jpg'"
            alt="descarga propuesta constitucion"
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
          href="https://www.chileconvencion.cl/wp-content/uploads/2022/06/GUIA_PRACTICA_BORRADORNC_SECOMCC_compressed-2.pdf"
          target="_blank"
          flat
      >
        <v-img
            :src="'/media/ad-descarga-guia-practica-constitucion.jpg'"
            alt="descarga guía practica constitucion"
        />
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-btn
          href="https://drive.google.com/drive/folders/1h0IpZDSzC3x32sCpW8Sao9wcKxUyW5TG?usp=sharing"
          target="_blank"
          depressed
          color="#f87519"
          dark
          block
          large
      >
        <v-icon left large>
          {{ icons.mdiPalette }}
        </v-icon>
        <strong>Descarga Kit Gráfico</strong>
        <v-icon right large>
          {{ icons.mdiScriptText }}
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import { mdiPalette, mdiScriptText } from '@mdi/js'

export default {
  name: "DescargasSection",
  data(){
    return {
      icons: {
        mdiPalette,
        mdiScriptText
      }
    }
  }
}
</script>

<style scoped>

</style>
