<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-row>
        <v-col>
          <h1>
            Noticias
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(noticia, index) in noticias"
            :key="index"
        >
          <HomeNoticiaCard
              :title="noticia.title"
              :description="noticia.description"
              :image="noticia.image"
              :route="noticia.route"
              :date="noticia.date"
          />
        </v-col>
      </v-row>
      <div class="page-stepper">
        <MdiIcon
            :icon="mdiChevronLeft"
            @click="previusPage()"
        />
        <h4>
          {{ page }}
        </h4>
        <MdiIcon
            :icon="mdiChevronRight"
            @click="nextPage()"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import HomeNoticiaCard from "@theme/components/NoticiaCard";
import MdiIcon from "../global-components/MdiIcon";
import {mdiChevronLeft, mdiChevronRight} from "@mdi/js";

export default {
  name: "Noticias",
  components: {
    HomeNoticiaCard,
    MdiIcon
  },
  data(){
    return {
      mdiChevronLeft,
      mdiChevronRight,
      page: 1,
      itemsPerPage: 12,
    }
  },
  computed: {
    noticias() {
      const limit = this.itemsPerPage;
      const offset = this.page - 1;
      const firstBlog = limit * offset;
      const lastBlog = (limit * (offset + 1)) - 1;
      return this.$site.themeConfig.noticias.slice(firstBlog, lastBlog);
    },
  },
  methods: {
    previusPage(){
      if(this.page > 1){
        this.page--;
      }
    },
    existPage(page){
      return page <= this.lastPage();
    },
    nextPage(){
      if(this.existPage(this.page + 1)){
        this.page++
      }
    },
    lastPage(){
      return parseInt(this.$site.themeConfig.noticias.length / this.itemsPerPage) + 1;
    }
  },
  mounted(){
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('page')){
      const page = parseInt(urlParams.get('page'));
      if(page <= 0){
        this.page = 1
      } else if(this.existPage(page)){
        this.page = page
      } else {
        this.page = this.lastPage();
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-stepper
  padding-top 15px
  padding-bottom 15px
  width 20rem
  margin 0 auto
  display flex
  justify-content space-around
  max-height 5rem
.blogs
  display block
  padding $navbarHeight 2rem 0
  max-width 1000px
  width 100%
  margin 0 auto

.blogs-container
  border-top 1px solid $borderColor
  display flex
  flex-wrap wrap
  align-items flex-start
  align-content start
  justify-content start

.blog-card
  width 30%


@media (max-width: $MQMobile)
  .blog-card
    width 100%

@media (max-width: $MQNarrow)
  .blog-card
    width 45%


</style>
