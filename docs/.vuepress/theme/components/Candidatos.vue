<template>
  <v-row justify="center">
    <v-col
        cols="12"
        md="10"
    >
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
              v-model="tiposCandidaturasSeleccionadas"
              :items="tiposCandidaturas"
              multiple
              dense
              label="Tipo Candidatura"
          >
            <template #selection="{item, index}">
              <v-chip small v-if="index === 0 && todosTiposCandidaturasSeleccionadas">
                <span>Todos</span>
              </v-chip>
              <v-chip small v-else-if="!todosTiposCandidaturasSeleccionadas">
                {{ item.text }}
              </v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col cols="10" sm="5">
          <v-autocomplete
              v-model="comunaSeleccionada"
              :items="comunas"
              dense
              label="Comuna"
              clearable
          />
        </v-col>
        <v-col cols="2" sm="1" class="text-center">
          <v-btn
              fab
              small
              @click="getComuna"
              color="primary"
              :loading="buscandoComuna"
          >
            <v-icon>
              {{mdiMapMarkerRadius}}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(candidato, index) in candidatos"
            :key="index"
        >
          <CandidatoCard
              :image="candidato.image"
              :nombre="candidato.title"
              :papeleta="candidato.papeleta"
              :candidatura-distrito-circunscripcion="candidaturaDistritoCircunscripcion(candidato)"
              :candidatura-territorio="candidaturaTerritorio(candidato)"
              :route="candidato.route"
              :tipo-candidatura="candidato.tipoCandidatura"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {divisionElectoral, regiones} from "../util/divisionElectoral";
import CandidatoCard from "./CandidatoCard";
import { mdiMapMarkerRadius } from '@mdi/js';
import { Loader } from "@googlemaps/js-api-loader"

export default {
  name: "Candidatos",
  components: {CandidatoCard},
  data(){
    return {
      mdiMapMarkerRadius,
      tiposCandidaturasSeleccionadas: [1,2,3],
      tiposCandidaturas: [
        { value: 1, text: "Diputaciones", candidatura: 'Diputado/a' },
        { value: 2, text: "Senadores/as", candidatura: "Senador/a" },
        { value: 3, text: "CORES", candidatura: "CORE" }
      ],
      comunaSeleccionada: null,
      buscandoComuna: false
    }
  },
  watch: {
    comunaSeleccionada(comuna){
      this.setLastComuna(comuna)
    }
  },
  mounted(){
    this.getLastComuna()
  },
  computed: {
    candidatos(){
      let candidaturas = this.$site.themeConfig.candidatos.map(candidato => {
        let comunas = [];
        if(candidato.tipoCandidatura === 1){
          comunas = this.comunasDistrito(candidato.distrito);
        } else if (candidato.tipoCandidatura === 2) {
          comunas = this.comunasRegion(candidato.circunscripcionSenatorial);
        } else if (candidato.tipoCandidatura === 3) {
          comunas = this.comunasProvincia(candidato.circunscripcionProvincial);
        }
        return {
          ...candidato,
          comunas
        }
      });
      if(this.tiposCandidaturasSeleccionadas || this.comunaSeleccionada){
        candidaturas = candidaturas.filter(candidatura=>{
          return (!this.tiposCandidaturasSeleccionadas.includes([1,2,3])?
              this.tiposCandidaturasSeleccionadas.includes(candidatura.tipoCandidatura): true) &&
              (this.comunaSeleccionada?
                  candidatura.comunas.includes(this.comunaSeleccionada): true)
        })
      }
      return candidaturas;
    },
    comunas(){
      const comunas = divisionElectoral.map((comuna)=> {
        return {
          value: comuna.comuna,
          text: comuna.comuna,
          circunscripcionSenatorial: comuna.circunscripcionSenatorial,
          distrito: comuna.distrito,
          circunscripcionProvincial: comuna.circunscripcionProvincial
        }
      });
      return comunas.sort((a, b) => a.value.localeCompare(b.value));
    },
    todosTiposCandidaturasSeleccionadas(){
      return this.tiposCandidaturasSeleccionadas.includes(1) &&
        this.tiposCandidaturasSeleccionadas.includes(2) &&
        this.tiposCandidaturasSeleccionadas.includes(3)
    }
  },
  methods: {
    getLastComuna(){
      const comuna = localStorage.getItem('comunaUsuario')
      if(comuna){
        this.comunaSeleccionada = comuna;
      }
    },
    setLastComuna(comuna){
      localStorage.setItem('comunaUsuario', comuna)
    },
    getComuna(){
      this.buscandoComuna = true;
      if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latLenFloat = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude)
          }
          const key = this.$site.themeConfig.gkey
          const loader = new Loader({
            apiKey: key,
            version: "weekly"
          });
          loader.load().then(async () => {
            const latLng = new google.maps.LatLng(latLenFloat)
            //const request = new google.maps.GeocoderRequest ({
            //  location: latLng
            //})
            const geocoder = new google.maps.Geocoder()
            const response = await geocoder.geocode({
              location: latLng
            });
            const comuna = response.results[0]['address_components']
                .find( ac => ac.types.includes('administrative_area_level_3'))['short_name'];
            this.setComuna(comuna);
            this.buscandoComuna = false;
          });

        }, (error) =>{
          console.log('geoerror: ' + error)
        });
      } else {
        this.buscandoComuna = false;
        console.log('no geolocation')
      }
    },
    setComuna(userComuna){
      for(let i = 0; i < this.comunas.length; i++){
        const comuna = this.comunas[i];
        const comunaLower = comuna.value.toLowerCase()
        const userComunaLower = userComuna.toLowerCase()
        if(comunaLower.indexOf(userComunaLower) >= 0 || userComunaLower.indexOf(comunaLower) >= 0){
          this.comunaSeleccionada = comuna.value;
          break;
        }
      }
    },
    candidaturaDistritoCircunscripcion(candidato){
      switch (candidato.tipoCandidatura){
        case 1:
          return "Diputado/a Distrito " + candidato.distrito;
        case 2:
          return "Senador/a Circunscripción " + candidato.circunscripcionSenatorial;
        case 3:
          return "CORE Circunscripción " + candidato.circunscripcionProvincial;
      }
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
    candidaturaTerritorio(candidato){
      switch (candidato.tipoCandidatura){
        case 1:
          return candidato.comunas
              .join(", ")
        case 2:
          return regiones.find(region => region.circunscripcion === candidato.circunscripcionSenatorial)?.region;
        case 3:
          return candidato.comunas
              .join(", ")
      }
    }
  }
}
</script>

<style lang="stylus">
.candidatos
  display block
  padding $navbarHeight 0 0
  width 100%
  margin 0 auto

</style>
