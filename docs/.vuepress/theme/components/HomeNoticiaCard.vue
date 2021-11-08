<template>
  <div class="blog-card">
    <img
        :alt="'image' + title.toLowerCase().replace(' ', '_')"
        :src="image"
    >
    <div class="blog-card-content">
      <h2>
        {{ title}}
      </h2>
      <p>
        {{ description }}
      </p>
      <a :href="route">
        Leer más
      </a>
    </div>
  </div>
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
.blog-card
  margin 1rem
  box-shadow 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)
  border-radius 4px
  background-color #fff
  border-color #fff
  border-width thin
  display block
.blog-card-content
  padding 0 1rem 1rem 1rem
img
  width 100%
  aspect-ratio 16 / 9
  object-fit cover
h2
  margin 0
  border-bottom 0
  display -webkit-box
  -webkit-line-clamp 3
  -webkit-box-orient vertical
  overflow hidden
p
  display -webkit-box
  -webkit-line-clamp 3
  -webkit-box-orient vertical
  overflow hidden
</style>
