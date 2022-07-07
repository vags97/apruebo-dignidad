<template>
  <v-card tile>
    <v-card-title class="pb-0">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <p class="mb-0">
        <strong>Fecha: </strong>{{ dateLocal(date) }} Hrs.
        <br>
        <strong>Organizador: </strong>{{ organizador }}
        <br>
        <strong>Dirección: </strong>{{ direccion }}
        <br>
        <strong>Descripción: </strong>{{ description.slice(0,200) + (description.length>200? '...':'') }}
      </p>
      <v-btn
          text
          color="primary"
          :to="route"
          class="pa-0"
          small
      >
        Leer más
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ActividadesHomeCard",
  props: {
    title: {
      type: String,
      default: "Sin Título"
    },
    image: {
      type: String,
      default: '/media/sin-imagen'
    },
    description: {
      type: String,
      default: 'Sin Descripción'
    },
    direccion: {
      type: String,
      default: 'Sin Dirección'
    },
    organizador: {
      type: String,
      default: 'Sin Organizador'
    },
    route: {
      type: String,
      default: null
    },
    date: {
      type: String,
      default: null
    },
  },
  methods: {
    dateLocal (dateTime) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      return dateTime
          ? new Date(dateTime).toLocaleString('es-CL', options)
          : ''
    },
  }
}
</script>

<style scoped>

</style>
