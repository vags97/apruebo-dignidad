<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >
    <v-img
        :src="image?image: '/media/noProfile.png'"
        height="200px"
        :alt="'image' + nombre.toLowerCase().replace(' ', '_')"
    />
    <v-card-title>
      {{ nombre }}
    </v-card-title>

    <v-card-subtitle>
      <v-chip
          :color="colorChip(tipoCandidatura)"
          small
          label
      >
        <strong>{{ candidaturaDistritoCircunscripcion }}</strong>
      </v-chip>
      <br>
      {{"Vota " + papeleta}}
      <br>
      {{ candidaturaTerritorio }}
      <br>
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
      default: null
    },
    nombre: {
      type: String,
      default: null
    },
    candidaturaDistritoCircunscripcion: {
      type: String,
      default: null
    },
    papeleta: {
      type: String,
      default: null
    },
    candidaturaTerritorio: {
      type: String,
      default: null
    },
    route: {
      type: String,
      default: null
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
