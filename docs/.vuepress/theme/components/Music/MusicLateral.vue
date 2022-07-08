<template>
  <div ref="containerdiv">
    <v-card flat color="primary" :class="{'floating-card': $vuetify.breakpoint.lgAndUp}" :style="{ 'width': width }">
      <v-card-title class="white--text font-weight-bold">
        <v-icon color="white" left>
          {{ mdiVolumeHigh }}
        </v-icon>
        Audiolibro
      </v-card-title>
      <v-card-text class="px-0">
        <v-list
            color="transparent"
            dense
        >
          <v-list-item-group v-model="thisCurrentAudioId">
            <v-list-item
                v-for="(audio, index) in audios"
                :key="audio.id"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPlay }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="white--text font-weight-bold">
                {{ audio.name }}
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiPlay, mdiVolumeHigh  } from '@mdi/js'
export default {
  name: "MusicLateral",
  props:{
    audios: {
      type: Array,
      default: () => []
    },
    currentAudioId: {
      type: Number,
      default: 1
    },
  },
  data(){
    return {
      mdiPlay,
      mdiVolumeHigh,
      width: '200px'
    }
  },
  computed: {
    thisCurrentAudioId: {
      get(){
        return this.currentAudioId-1
      },
      set(val){
        this.$emit('update:current-audio-id', val+1)
      }
    }
  },
  mounted(){
    this.width = this.$refs.containerdiv.clientWidth + 'px'
    window.addEventListener("resize", this.resizeWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeWidth);
  },
  methods: {
    resizeWidth(){
      this.width = this.$refs.containerdiv.clientWidth + 'px'
    }
  }
}
</script>

<style scoped>
.floating-card {
  position: fixed;
  z-index: 1;
  margin-top: 0;
}

</style>
