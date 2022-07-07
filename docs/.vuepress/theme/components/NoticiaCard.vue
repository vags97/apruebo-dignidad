<template>
  <v-card
      tile
  >
    <v-img
        height="200px"
        :alt="'image' + title.toLowerCase().replace(' ', '_')"
        :src="image"
    />
    <v-card-title>
      {{ title}}
    </v-card-title>
    <v-card-subtitle>
      {{ dateLocal(date) }} Hrs.
    </v-card-subtitle>
    <v-card-text>
      <p>
        {{ description.slice(0,200) + (description.length>200? '...':'') }}
      </p>
      <v-btn
          text
          color="primary"
          :to="route"
          class="pa-0"
      >
        Leer más
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HomeBlogCard",
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
    route: {
      type: String,
      default: null
    },
    date: {
      type: String,
      default: null
    }
  },
  methods:{
    dateLocal (dateTime) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
      return dateTime
          ? new Date(dateTime).toLocaleString('es-CL', options)
          : ''
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>
