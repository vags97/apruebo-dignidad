<template>
  <v-footer color="primary">
    <v-container>
      <v-row justify="center" class="py-4">
        <v-col cols="8">
          <v-row justify="space-around">
            <v-icon
                color="white"
                @click="openInNewTab(facebookUrl)"
            >
              {{ mdiFacebook }}
            </v-icon>
            <v-icon
                color="white"
                @click="openInNewTab(instagramUrl)"
            >
              {{ mdiInstagram }}
            </v-icon>
            <v-icon
                color="white"
                @click="openInNewTab(twitterUrl)"
            >
              {{ mdiTwitter }}
            </v-icon>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="space-around" class="pa-2">
        <button class="conglomerado" @click="openInNewTab('https://boricpresidente.cl/')">
          <div class="boric-logo"/>
        </button>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mdiFacebook, mdiInstagram, mdiTwitter } from '@mdi/js';
import MdiIcon from "../global-components/MdiIcon";

export default {
  name: "Footer",
  components: {
    MdiIcon
  },
  data(){
    return {
      mdiFacebook,
      mdiInstagram,
      mdiTwitter
    }
  },
  computed: {
    facebookUrl() {
      return this.rrssUrl(this.$themeConfig.facebook, 'https://www.facebook.com/');
    },
    twitterUrl() {
      return this.rrssUrl(this.$themeConfig.twitter, 'https://www.twitter.com/');
    },
    instagramUrl() {
      return this.rrssUrl(this.$themeConfig.instagram, 'https://www.instagram.com/');
    }
  },
  methods: {
    rrssUrl(profile, url){
      if(!profile) return '';
      return url + profile;
    },
    openInNewTab(href) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
      href: href,
      }).click();
    }
  }
}
</script>

<style lang="stylus">
.rrss
  padding-top 15px
  padding-bottom 15px
  width 20rem
  margin 0 auto
  display flex
  justify-content space-around
.conglomerado-container
  padding-top 15px
  padding-bottom 15px
  width 40rem
  margin 0 auto
  display flex
  justify-content space-around
  max-height 5rem


@media (max-width: $MQMobile)
  .conglomerado-container
    display flex
    width 100vw

</style>
