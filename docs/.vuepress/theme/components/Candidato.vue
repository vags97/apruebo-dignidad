<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <v-card>
        <v-col
            cols="12"
        >
          <v-img
              :src="candidato.image?candidato.image: '/media/noProfile.png'"
              class="candidato-image white--text align-end"
              :alt="'image' + candidato.title.toLowerCase().replace(' ', '_')"
          >
            <div class="content-text">
              <v-card-title>
                {{ candidato.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ candidaturaDistritoCircunscripcion }}
                <br>
                {{"Vota " + candidato.papeleta}}
                <br>
                {{ candidaturaTerritorio }}
                <br>
                Partido: {{ candidato.partido }}
              </v-card-subtitle>
            </div>
          </v-img>
        </v-col>
        <v-card-subtitle>
          <v-row justify="space-around">
            <v-icon
                v-if="candidato.paginaWeb"
                color="primary"
                @click="openInNewTab(candidato.paginaWeb)"
            >
              {{ mdiWeb }}
            </v-icon>
            <v-icon
                v-if="candidato.facebook"
                color="primary"
                @click="openInNewTab(candidato.facebook)"
            >
              {{ mdiFacebook }}
            </v-icon>
            <v-icon
                v-if="candidato.instagram"
                color="primary"
                @click="openInNewTab(candidato.instagram)"
            >
              {{ mdiInstagram }}
            </v-icon>
            <v-icon
                v-if="candidato.twitter"
                color="primary"
                @click="openInNewTab(candidato.twitter)"
            >
              {{ mdiTwitter }}
            </v-icon>
            <v-icon
                v-if="candidato.youtube"
                color="primary"
                @click="openInNewTab(candidato.youtube)"
            >
              {{ mdiYoutube }}
            </v-icon>
            <v-icon
                v-if="candidato.tiktok"
                color="primary"
                @click="openInNewTab(candidato.tiktok)"
            >
              {{ mdiTiktok }}
            </v-icon>
          </v-row>
        </v-card-subtitle>
        <v-card-text>
          <Content/>
        </v-card-text>
        <v-card-text v-if="!candidato.contactado">
          ¿Eres el/la candidato/a? Escríbenos a <a href="mailto:candidatos.apruebo.dignidad@gmail.com">candidatos.apruebo.dignidad@gmail.com</a>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {divisionElectoral, regiones} from "../util/divisionElectoral";
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiTiktok,
  mdiYoutube,
  mdiWeb
} from '@mdi/js';

export default {
  data(){
    return {
      mdiFacebook,
      mdiInstagram,
      mdiTwitter,
      mdiTiktok,
      mdiYoutube,
      mdiWeb,
      comunas: [],
      candidato: null,
    }
  },
  created(){
    this.candidato = this.$page.frontmatter
    this.comunas = this.getComunas(this.candidato);
  },
  computed: {
    candidaturaDistritoCircunscripcion(){
      if(this.candidato.diputado){
        return "Diputado/a Distrito " + this.candidato.distrito;
      } else if (this.candidato.senador) {
        return "Senador/a Circunscripción " + this.candidato.circunscripcionSenatorial;
      } else if (this.candidato.core){
        return "CORE Circunscripción " + this.candidato.circunscripcionProvincial;
      }
    },
    candidaturaTerritorio(){
      if(this.candidato.diputado){
        return this.comunas
            .join(", ")
      } else if (this.candidato.senador) {
        return regiones.find(region => region.circunscripcion === this.candidato.circunscripcionSenatorial)?.region;
      } else if (this.candidato.core){
        return this.comunas
            .join(", ")
      }
    }
  },
  methods: {
    getComunas(candidato){
      if(candidato.diputado){
        return this.comunasDistrito(candidato.distrito);
      } else if (candidato.senador) {
        return this.comunasRegion(candidato.circunscripcionSenatorial);
      } else if (candidato.core){
        return this.comunasProvincia(candidato.circunscripcionProvincial);
      }
    },
    openInNewTab(href) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
      }).click();
    },
    comunasDistrito(distrito){
      return divisionElectoral.reduce((acc, comuna)=>{
        if(comuna.distrito === distrito){
          acc.push(comuna.comuna)
        }
        return acc;
      }, [])
          .sort((a,b) => a.localeCompare(b))
    },
    comunasProvincia(circunscripcionProvincial){
      return divisionElectoral.reduce((acc, comuna)=>{
        if(comuna.circunscripcionProvincial === circunscripcionProvincial){
          acc.push(comuna.comuna)
        }
        return acc;
      }, [])
          .sort((a,b) => a.localeCompare(b))
    },
    comunasRegion(circunscripcionSenatorial){
      return divisionElectoral.reduce((acc, comuna)=>{
        if(comuna.circunscripcionSenatorial === circunscripcionSenatorial){
          acc.push(comuna.comuna)
        }
        return acc;
      }, [])
          .sort((a,b) => a.localeCompare(b))
    },
  }
}
</script>

<style lang="stylus">

.candidato-image
  aspect-ratio 16/9
  width 100%
  max-height 100%
  .content-text
    background-color rgba(0,0,0,0.5)

</style>
