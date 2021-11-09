<template>
  <v-card>
    <v-img
        height="200px"
        :alt="'image' + title.toLowerCase().replace(' ', '_')"
        :src="image"
    />
    <v-card-title>
      {{ title}}
    </v-card-title>
    <v-card-text>
      <p>
        {{ description }}
      </p>
      <a :href="route">
        Leer más
      </a>
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
