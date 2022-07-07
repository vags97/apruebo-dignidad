<template>
  <v-footer
      app
      absolute
      color="primary"
      padless
  >
    <v-container>
      <v-row justify="center" class="py-4">
        <v-col cols="8">
          <v-row justify="space-around">
            <v-btn
                icon
                color="white"
                target="_blank"
                :href="facebookUrl"
            >
              <v-icon>
                {{ mdiFacebook }}
              </v-icon>
            </v-btn>
            <v-btn
                icon
                color="white"
                target="_blank"
                :href="instagramUrl"
            >
              <v-icon>
                {{ mdiInstagram }}
              </v-icon>
            </v-btn>
            <v-btn
                icon
                color="white"
                target="_blank"
                :href="twitterUrl"
            >
              <v-icon>
                {{ mdiTwitter }}
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="space-around" class="pa-2">
        <a href="https://www.chileconvencion.cl/" target="_blank">
          <div class="cc-logo"/>
        </a>
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
  }
}
</script>

<style lang="stylus">

</style>
