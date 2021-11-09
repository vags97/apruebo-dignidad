<template>
  <main class="blog">
    <slot name="top" />
    <div class="blog-info">
      <img
          :alt="'image' + data.title.toLowerCase().replace(' ', '_')"
          :src="data.image"
      >
      <h1>
        {{ data.title}}
      </h1>
      <h3>
        {{ data.description }}
      </h3>
    </div>
    <Content class="blog-content" />

    <slot name="bottom" />
  </main>
</template>

<script>

export default {
  computed: {
    data() {
      return this.$page.frontmatter
    },
  }
}
</script>

<style lang="stylus">

.blog-info
  img
    max-width 100%

.blog-content
  max-width 1000px
  margin 0 auto

.blog
  padding $navbarHeight 2rem 0
  max-width 1000px
  margin 0 auto
  display block


</style>
