<template>
  <div>
    <script v-html="jsonLd()" type="application/ld+json"></script>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-img
              :src="candidato.image?candidato.image: '/media/ad-profile.jpg'"
              class="candidato-image white--text align-end"
              :alt="'image' + candidato.title.toLowerCase().replace(' ', '_')"
          >
            <div class="content-text">
              <v-card-title class="d-none d-md-flex">
                {{ candidato.title }}
              </v-card-title>
              <v-card-subtitle class="d-none d-md-flex">
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
          <v-card-title class="d-flex d-md-none">
            {{ candidato.title }}
          </v-card-title>
          <v-card-subtitle class="d-flex d-md-none pb-0">
            {{ candidaturaDistritoCircunscripcion }}
            <br>
            {{"Vota " + candidato.papeleta}}
            <br>
            {{ candidaturaTerritorio }}
            <br>
            Partido: {{ candidato.partido }}
          </v-card-subtitle>
          <v-card-subtitle
              v-if="candidato.paginaWeb
              || candidato.facebook
              || candidato.instagram
              || candidato.twitter
              || candidato.youtube
              || true"
          >
            <v-row justify="space-around">
              <v-col v-if="candidato.paginaWeb" class="text-center">
                <v-btn
                    icon
                    color="primary"
                    target="_blank"
                    :href="candidato.paginaWeb"
                >
                  <v-icon>
                    {{ mdiWeb }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="candidato.facebook" class="text-center">
                <v-btn
                    icon
                    color="primary"
                    target="_blank"
                    :href="rrssUrl(candidato.facebook, 'facebook')"
                >
                  <v-icon>
                    {{ mdiFacebook }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="candidato.instagram" class="text-center">
                <v-btn
                    icon
                    color="primary"
                    target="_blank"
                    :href="rrssUrl(candidato.instagram, 'instagram')"
                >
                  <v-icon>
                    {{ mdiInstagram }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="candidato.twitter" class="text-center">
                <v-btn
                    icon
                    color="primary"
                    target="_blank"
                    :href="rrssUrl(candidato.twitter, 'twitter')"
                >
                  <v-icon>
                    {{ mdiTwitter }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="candidato.youtube" class="text-center">
                <v-btn
                    icon
                    color="primary"
                    target="_blank"
                    :href="candidato.youtube"
                >
                  <v-icon>
                    {{ mdiYoutube }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="candidato.tiktok" class="text-center">
                <v-btn
                    icon
                    color="primary"
                    target="_blank"
                    :href="rrssUrl(candidato.tiktok, 'tiktok')"
                >
                  <v-icon class="tiktok-icon primary"/>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
            <Content/>
            <v-row justify="center" v-if="candidato.twitter">
              <v-col cols="12" md="6">
                <Timeline
                    class="twitter"
                    :id="getTwitterUsername(candidato.twitter)"
                    sourceType="profile"
                    :options="{ tweetLimit: '3' }"
                >
                  Cargado Twitter ...
                </Timeline>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text v-if="!candidato.contactado">
            ¿Eres el/la candidato/a? Escríbenos a <a href="mailto:candidatos.apruebo.dignidad@gmail.com">candidatos.apruebo.dignidad@gmail.com</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
import {validURL} from "../util";
import Timeline from "vue-tweet-embed/src/timeline";

export default {
  name: 'Candidato',
  components: {
    Timeline
  },
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
      candidaturaDistritoCircunscripcion: '',
      candidaturaTerritorio: '',
    }
  },
  created(){
    this.candidato = this.$page.frontmatter;
    this.comunas = this.getComunas(this.candidato);
    this.candidaturaDistritoCircunscripcion = this.getCandidaturaDistritoCircunscripcion();
    this.candidaturaTerritorio = this.getCandidaturaTerritorio();
  },
  methods: {
    jsonLd(){
      const jsonLd = this.$site.themeConfig.jsonLd;
      const candidato = this.candidato;
      let sameAs = []
      if(candidato.facebook){
        sameAs.push(this.rrssUrl(candidato.facebook, 'facebook'))
      }
      if(candidato.instagram){
        sameAs.push(this.rrssUrl(candidato.instagram, 'instagram'))
      }
      if(candidato.twitter){
        sameAs.push(this.rrssUrl(candidato.twitter, 'twitter'))
      }
      if(candidato.youtube){
        sameAs.push(candidato.youtube)
      }
      if(candidato.tiktok){
        sameAs.push(this.rrssUrl(candidato.tiktok, 'tiktok'))
      }
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        "id": "candidato",
        "name": candidato.title,
        "url": candidato.paginaWeb? candidato.paginaWeb: this.$site.themeConfig.domain,
        "image": this.$site.themeConfig.domain + (candidato.image? candidato.image : '/media/ad-profile.jpg'),
        "sameAs": sameAs,
        "jobTitle": ["Candidato", "Candidata", candidato.tipoCandidatura === 1? "Diputado": candidato.tipoCandidatura === 2? "Senador": "Consejero Regional"],
        "worksFor": [
          jsonLd.chile,
          jsonLd.aprueboDignidad
        ]
      }
    },
    getTwitterUsername(twitter){
      if(!validURL(twitter)){
        return twitter[0] === '@'? twitter.substr(1): twitter;
      }
      const url = new URL(twitter).pathname;
      const twitterArray = url.split('/');
      return twitterArray[1];
    },
    getCandidaturaDistritoCircunscripcion(){
      if(this.candidato.diputado){
        return "Diputado/a Distrito " + this.candidato.distrito;
      } else if (this.candidato.senador) {
        return "Senador/a Circunscripción " + this.candidato.circunscripcionSenatorial;
      } else if (this.candidato.core){
        return "CORE Circunscripción " + this.candidato.circunscripcionProvincial;
      }
    },
    getCandidaturaTerritorio(){
      if(this.candidato.diputado){
        return this.comunas
            .join(", ")
      } else if (this.candidato.senador) {
        return regiones.find(region => region.circunscripcion === this.candidato.circunscripcionSenatorial)?.region;
      } else if (this.candidato.core){
        return this.comunas
            .join(", ")
      }
    },
    rrssUrl(userUrl, rrss){
      if(validURL(userUrl)){
        return userUrl
      }
      let url = ''
      let userName = ''
      switch (rrss){
        case 'facebook':
          userName = userUrl[0] === '@'? userUrl.substr(1): userUrl;
          url = 'https://www.facebook.com/'
          break
        case 'twitter':
          userName = userUrl[0] === '@'? userUrl.substr(1): userUrl;
          url = 'https://twitter.com/'
          break
        case 'instagram':
          userName = userUrl[0] === '@'? userUrl.substr(1): userUrl;
          url = 'https://www.instagram.com/'
          break
        case 'tiktok':
          userName = userUrl;
          url = 'https://www.tiktok.com/'
          break
      }
      return url + userName
    },
    getComunas(candidato){
      if(candidato.diputado){
        return this.comunasDistrito(candidato.distrito);
      } else if (candidato.senador) {
        return this.comunasRegion(candidato.circunscripcionSenatorial);
      } else if (candidato.core){
        return this.comunasProvincia(candidato.circunscripcionProvincial);
      }
    },
    comunasDistrito(distrito){
      return divisionElectoral.reduce((acc, comuna)=>{
        if(comuna.distrito === distrito){
          acc.push(comuna.comuna)
        }
        return acc;
      }, [])
    },
    comunasProvincia(circunscripcionProvincial){
      return divisionElectoral.reduce((acc, comuna)=>{
        if(comuna.circunscripcionProvincial === circunscripcionProvincial){
          acc.push(comuna.comuna)
        }
        return acc;
      }, [])
    },
    comunasRegion(circunscripcionSenatorial){
      return divisionElectoral.reduce((acc, comuna)=>{
        if(comuna.circunscripcionSenatorial === circunscripcionSenatorial){
          acc.push(comuna.comuna)
        }
        return acc;
      }, [])
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
