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
    <v-snackbar
        v-model="busquedaExitosa"
        class="pb-0"
        color="green"
    >
      <v-icon left>
        {{ mdiCheckCircle }}
      </v-icon>
      {{ mensajeBusquedaExitosa }}
    </v-snackbar>
    <v-snackbar
        v-model="errorComuna"
        class="pb-0"
        color="red"
    >
      <v-icon left>
        {{ mdiAlertCircle}}
      </v-icon>
      Error al buscar comuna.
    </v-snackbar>
    <v-snackbar
        v-model="advertenciaComuna"
        class="pb-0"
        color="yellow"
    >
      <v-icon left>
        {{ mdiAlertCircle}}
      </v-icon>
      No se pudo asignar comuna a: {{comunaEncontrada}}.
    </v-snackbar>
  </v-row>
</template>

<script>
import {divisionElectoral, regiones} from "../util/divisionElectoral";
import CandidatoCard from "./CandidatoCard";
import { mdiMapMarkerRadius, mdiAlertCircle, mdiCheckCircle  } from '@mdi/js';
import { Loader } from "@googlemaps/js-api-loader"
import {replaceNonAscii} from "../util";

export default {
  name: "Candidatos",
  components: {CandidatoCard},
  data(){
    return {
      mdiMapMarkerRadius,
      mdiAlertCircle,
      mdiCheckCircle,
      busquedaExitosa: false,
      mensajeBusquedaExitosa: '',
      tiposCandidaturasSeleccionadas: [1,2,3],
      tiposCandidaturas: [
        { value: 1, text: "Diputados", candidatura: 'Diputado/a' },
        { value: 2, text: "Senadores", candidatura: "Senador/a" },
        { value: 3, text: "CORES", candidatura: "CORE" }
      ],
      comunaSeleccionada: null,
      buscandoComuna: false,
      errorComuna: false,
      advertenciaComuna: false,
      comunaEncontrada: ''
    }
  },
  watch: {
    comunaSeleccionada(comuna){
      this.saveLastComuna(comuna)
      this.showGetComunaExitosoMessage(comuna)

    },
    tiposCandidaturasSeleccionadas: {
      deep: true,
      handler(tiposCandidaturas){
        this.saveLastTiposCandidaturas(tiposCandidaturas)
        this.showGetTipoCandidatosMessage(tiposCandidaturas)
      }
    }
  },
  mounted(){
    this.setLastComuna()
    this.setUrlTiposCandidaturas()
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
      return divisionElectoral.map((comuna)=> {
        return {
          value: comuna.comuna,
          text: comuna.comuna,
          circunscripcionSenatorial: comuna.circunscripcionSenatorial,
          distrito: comuna.distrito,
          circunscripcionProvincial: comuna.circunscripcionProvincial
        }
      });
    },
    todosTiposCandidaturasSeleccionadas(){
      return this.tiposCandidaturasSeleccionadas.includes(1) &&
        this.tiposCandidaturasSeleccionadas.includes(2) &&
        this.tiposCandidaturasSeleccionadas.includes(3)
    }
  },
  methods: {
    showGetComunaExitosoMessage(comuna){
      if(comuna){
        this.mensajeBusquedaExitosa = 'Candidatos de ' + comuna + ' obtenidos correctamente.';
      } else {
        this.mensajeBusquedaExitosa = 'Candidatos obtenidos correctamente.';
      }
      this.busquedaExitosa = true;
    },
    showGetTipoCandidatosMessage(tiposCandidaturas){
      this.mensajeBusquedaExitosa = '';
      if(tiposCandidaturas.includes(1) && tiposCandidaturas.includes(2) && tiposCandidaturas.includes(3)){
        this.mensajeBusquedaExitosa += 'Candidatos'
      } else {
        if(tiposCandidaturas.includes(1)){
          this.mensajeBusquedaExitosa += 'Diputados'
          if(tiposCandidaturas.includes(2) || tiposCandidaturas.includes(3)){
            this.mensajeBusquedaExitosa += ' y '
          }
        }
        if(tiposCandidaturas.includes(2)){
          this.mensajeBusquedaExitosa += 'Senadores'
          if(tiposCandidaturas.includes(3)){
            this.mensajeBusquedaExitosa += ' y '
          }
        }
        if(tiposCandidaturas.includes(3)){
          this.mensajeBusquedaExitosa += 'Cores'
        }
      }
      this.mensajeBusquedaExitosa +=' obtenidos correctamente.'
      this.busquedaExitosa = true;
    },
    setLastComuna(){
      const comuna = this.$route.query.comuna?
          this.$route.query.comuna:
          localStorage.getItem('comunaUsuario')
      if(comuna){
        this.setComuna(comuna)
      }
    },
    saveLastComuna(comuna){
      if(comuna){
        const formatedComuna = replaceNonAscii(comuna.toLowerCase())
        const query = { ...this.$route.query, comuna: formatedComuna };
        this.$router.replace({ query }).catch(() => {});
        localStorage.setItem('comunaUsuario', formatedComuna)
      } else {
        let query = {...this.$route.query};
        delete query.comuna;
        this.$router.replace({ query }).catch(() => {});
        localStorage.removeItem('comunaUsuario')
      }
    },
    setUrlTiposCandidaturas(){
      if(this.$route.query.diputados === 'false'){
        this.tiposCandidaturasSeleccionadas = this.tiposCandidaturasSeleccionadas
            .filter(tipoCandidatura => tipoCandidatura !== 1)
      }
      if(this.$route.query.senadores === 'false'){
        this.tiposCandidaturasSeleccionadas = this.tiposCandidaturasSeleccionadas
            .filter(tipoCandidatura => tipoCandidatura !== 2)
      }
      if(this.$route.query.cores === 'false'){
        this.tiposCandidaturasSeleccionadas = this.tiposCandidaturasSeleccionadas
            .filter(tipoCandidatura => tipoCandidatura !== 3)
      }
    },
    saveLastTiposCandidaturas(tiposCandidaturas){
      tiposCandidaturas.includes(1)?
          this.removeLastTipoCandidatura('diputados'):
          this.saveLastTipoCandidatura('diputados')
      tiposCandidaturas.includes(2)?
          this.removeLastTipoCandidatura('senadores'):
          this.saveLastTipoCandidatura('senadores')
      tiposCandidaturas.includes(3)?
          this.removeLastTipoCandidatura('cores'):
          this.saveLastTipoCandidatura('cores')
    },
    saveLastTipoCandidatura(tipoCandidatura){
      const query = { ...this.$route.query, [tipoCandidatura]: false };
      this.$router.replace({ query }).catch(() => {});
    },
    removeLastTipoCandidatura(tipoCandidatura){
      let query = {...this.$route.query};
      delete query[tipoCandidatura];
      this.$router.replace({ query }).catch(() => {});
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
          loader.load().then( () => {
              const latLng = new google.maps.LatLng(latLenFloat)
              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({
                location: latLng
              }).then(response =>{
                const comuna = response.results[0]['address_components']
                    .find( ac => ac.types.includes('administrative_area_level_3'))['short_name'];
                this.setComuna(comuna);
              })
              .catch(()=>{
                this.errorComuna = true
                this.buscandoComuna = false;
              });
          })
          .catch(()=>{
            this.errorComuna = true
          })
          .finally(()=>{
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
        const comunaLower = replaceNonAscii(comuna.value.toLowerCase())
        const userComunaLower = replaceNonAscii(userComuna.toLowerCase())
        if(comunaLower.indexOf(userComunaLower) >= 0 || userComunaLower.indexOf(comunaLower) >= 0){
          this.comunaSeleccionada = comuna.value;
          return;
        }
      }
      if(!this.comunaSeleccionada){
        this.advertenciaComuna = true
        this.comunaEncontrada = userComuna
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
