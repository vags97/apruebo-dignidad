<template>
  <v-card>
    <v-img
        :src="image?image: '/media/ad-profile.jpg'"
        height="200px"
        :alt="'image' + nombre.toLowerCase().replace(' ', '_')"
    />
    <v-card-title>
      <a :href="route">
        {{ nombre }}
      </a>
    </v-card-title>

    <v-card-subtitle>
      <div v-if="tipoCandidatura && candidaturaDistritoCircunscripcion">
        <v-chip
            :color="colorChip(tipoCandidatura)"
            small
            label
        >
          <strong>{{ candidaturaDistritoCircunscripcion }}</strong>
        </v-chip>
        <br>
      </div>
      <div v-if="papeleta">
        {{"Vota " + papeleta}}
        <br>
      </div>
      <div v-if="candidaturaTerritorio">
        {{ candidaturaTerritorio }}
        <br>
      </div>
      <a :href="route">Leer más</a>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "CandidatoCard",
  props: {
    image: {
      type: String,
      default: ''
    },
    nombre: {
      type: String,
      default: ''
    },
    candidaturaDistritoCircunscripcion: {
      type: String,
      default: ''
    },
    papeleta: {
      type: String,
      default: ''
    },
    candidaturaTerritorio: {
      type: String,
      default: ''
    },
    route: {
      type: String,
      default: ''
    },
    tipoCandidatura: {
      type: Number,
      default: null
    },
  },
  methods: {
    colorChip(tipoCandidatura){
      switch(tipoCandidatura){
        case 1:
          return "primary"
        case 2:
          return "secondary"
        case 3:
          return "yellow"
      }
    }
  }
}
</script>

<style scoped>

</style>
