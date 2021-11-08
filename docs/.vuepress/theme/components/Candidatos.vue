<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-row>
        <v-col cols="3">
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
        <v-col cols="3">
          <v-autocomplete
              v-model="comunaSeleccionada"
              :items="comunas"
              dense
              label="Comuna"
              clearable
          />
        </v-col>
      </v-row>
      <v-row>
        <v-card>

        </v-card>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
            lg="4"
            v-for="(candidato, index) in candidatos"
            :key="index"
        >
          <div
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
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {divisionElectoral, regiones} from "../util/divisionElectoral";
import CandidatoCard from "./CandidatoCard";

export default {
  name: "Candidatos",
  components: {CandidatoCard},
  data(){
    return {
      tiposCandidaturasSeleccionadas: [1,2,3],
      tiposCandidaturas: [
        { value: 1, text: "Diputaciones", candidatura: 'Diputado/a' },
        { value: 2, text: "Senadores/as", candidatura: "Senador/a" },
        { value: 3, text: "CORES", candidatura: "CORE" }
      ],
      comunaSeleccionada: null
    }
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
    candidaturaDistritoCircunscripcion(candidato){
      let texto = ""
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
