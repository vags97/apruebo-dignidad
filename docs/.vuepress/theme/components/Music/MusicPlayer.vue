<template>
  <v-footer
      fixed
      padless
      v-show="currentAudioId"
  >
    <audio controls ref="audio" style="display: none">
      <source :src="currentAudio.url" type="audio/mpeg">
      No soportado
    </audio>
    <v-row class="controls pt-0 pb-3 primary" justify="center">
      <v-col cols="auto" class="px-3 font-weight-bold white--text v-align">
        <v-switch
            :input-value="currentAudioVoz"
            :value="currentAudioVoz"
            @change="updateAudioVoz"
            true-value="a"
            false-value="b"
            color="secondary"
            hide-details
            flat
            dense
            class="mt-0 mb-1"
        >
          <template #label>
            <span class="white--text">
              Voz: <span class="text-uppercase">{{currentAudioVoz}}</span>
            </span>
          </template>
        </v-switch>
      </v-col>
      <v-col cols="auto" class="px-3 font-weight-bold white--text v-align">
        {{ currentAudio.name }}
      </v-col>
      <v-col cols="auto" class=" v-align">
        <v-row>
          <v-btn @click="playBtn" color="transparent" tile elevation="0" :loading="loading">
            <v-icon color="white">
              {{ playing? icons.mdiPause: icons.mdiPlay }}
            </v-icon>
          </v-btn>
          <div class="px-3 font-weight-bold white--text v-align">
            {{ stringAudioTime }}
          </div>
          <div class="v-align">
            <v-slider
                @input="moveAudio"
                @mouseup="upAudioTime"
                @mousedown="changingAudioTime=true"
                :value="currentAudioTime"
                :min="0"
                :max="currentAudioDuration"
                dense
                hide-details
                style="min-width: 150px"
                color="secondary"
            />
          </div>
        </v-row>
      </v-col>
      <v-col cols="auto" class="v-align">
        <v-row>
          <v-tooltip top color="black">
            <template #activator="{ on, attrs }">
              <v-btn @click="prev" color="transparent" tile elevation="0" v-bind="attrs" v-on="on">
                <v-icon color="white">
                  {{ icons.mdiSkipPrevious }}
                </v-icon>
              </v-btn>
            </template>
            Capítulo Previo
          </v-tooltip>
          <v-tooltip top color="black">
            <template #activator="{ on, attrs }">
              <v-btn @click="next" color="transparent" tile elevation="0" v-bind="attrs" v-on="on">
                <v-icon color="white">
                  {{ icons.mdiSkipNext }}
                </v-icon>
              </v-btn>
            </template>
            Capítulo Siguiente
          </v-tooltip>
        </v-row>
      </v-col>
      <v-col cols="auto" class="v-align">
        <v-row>
          <v-tooltip top color="black">
            <template #activator="{ on, attrs }">
              <v-btn @click="close" color="transparent" tile elevation="0" v-bind="attrs" v-on="on">
                <v-icon color="white">
                  {{ icons.mdiClose }}
                </v-icon>
              </v-btn>
            </template>
            Cierra el reproductor y pausa el audio
          </v-tooltip>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mdiPlay, mdiPause, mdiSkipNext , mdiSkipPrevious, mdiClose } from '@mdi/js'

export default {
  name: "MusicPlayer",
  props:{
    audios: {
      type: Array,
      default: () => []
    },
    playing: {
      type: Boolean,
      default: false
    },
    currentAudioId: {
      type: Number,
      default: 1
    },
    currentAudioVoz: {
      type: String,
      default: 'a'
    },
    currentAudio: {
      type: Object,
      default: () => {
        return { id: null, name: 'Seleccione', url: null}
      },
    },
    currentAudioTime: {
      type: Number,
      default: 0
    },
    currentAudioDuration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      icons: {
        mdiPlay,
        mdiPause,
        mdiSkipNext,
        mdiSkipPrevious,
        mdiClose
      },
      changingAudioTime: false,
      loading: true
    }
  },
  computed: {
    stringAudioTime(){
      let minutes = Math.floor(this.currentAudioTime/60);
      let seconds = Math.round(this.currentAudioTime % 60);
      let minutesDuration = Math.floor(this.currentAudioDuration/60);
      let secondsDuration = Math.round(this.currentAudioDuration%60);
      if(minutesDuration >= 10 && minutes<10){
        minutes = '0' + minutes
      }
      if(seconds <10){
        seconds = '0' + seconds
      }
      if(secondsDuration <10){
        secondsDuration = '0' + secondsDuration
      }
      return `${minutes}:${seconds}/${minutesDuration}:${secondsDuration}`
    }
  },
  watch: {
    currentAudioId(val){
      if(val){
        localStorage.setItem('audioId', val)
        this.$refs.audio.load()
        this.$refs.audio.play()
      } else {
        localStorage.removeItem('audioId')
        localStorage.removeItem('currentTime')
        this.$refs.audio.pause()
      }
    }
  },
  mounted(){
    if(localStorage.getItem('audioId')){
      if(localStorage.getItem('currentAudioVoz')){
        this.$emit('update:current-audio-voz', localStorage.getItem('currentAudioVoz'))
      }
      this.$emit('update:current-audio-id', parseInt(localStorage.getItem('audioId')))
      this.changeAudioTime(parseInt(localStorage.getItem('currentTime')))
    }
    const audio = this.$refs.audio
    audio.addEventListener('durationchange', ()=>{
      this.$emit('update:current-audio-duration', audio.duration)
    })
    audio.addEventListener('timeupdate', ()=>{
      if(!this.changingAudioTime){
        this.$emit('update:current-audio-time', audio.currentTime)
        localStorage.setItem('currentTime', audio.currentTime.toString())
      }
    })
    audio.addEventListener('playing', ()=>{
      this.$emit('update:playing', !audio.paused)
    })
    audio.addEventListener('ended', this.next)
    audio.addEventListener('loadstart', ()=>{
      this.loading = true;
    })
    audio.addEventListener('loadeddata', ()=>{
      this.loading = false;
    })
  },
  methods: {
    playBtn(){
      if(this.playing){
        this.pause()
      } else {
        this.play()
      }
    },
    play(){
      this.$refs.audio.play()
      this.$emit('update:playing', true)
    },
    pause(){
      this.$refs.audio.pause()
      this.$emit('update:playing', false)
    },
    next(){
      const newSongId = this.currentAudioId === this.audios[this.audios.length-1].id? 0: this.currentAudioId+1
      this.$emit('update:current-audio-id', newSongId)
    },
    prev(){
      const newSongId = this.currentAudioId === this.audios[0].id? this.audios[this.audios.length-1].id: this.currentAudioId-1
      this.$emit('update:current-audio-id', newSongId)
    },
    changeAudioTime(time){
      this.$refs.audio.currentTime = time
    },
    moveAudio(time){
      if(this.changingAudioTime){
        this.$emit('update:current-audio-time',time)
      }
    },
    upAudioTime(){
      this.changingAudioTime=false
      this.$refs.audio.currentTime = this.currentAudioTime
    },
    updateAudioVoz(event){
      console.log(event)
      localStorage.setItem('currentAudioVoz', event)
      this.$emit('update:current-audio-voz', event)
      this.$refs.audio.load()
      this.$refs.audio.currentTime = this.currentAudioTime
      this.$refs.audio.play()
    },
    close(){
      this.$refs.audio.pause()
      this.$emit('update:current-audio-id', null)
    }
  }
}
</script>

<style scoped>

.v-align {
  display: flex;
  align-items:center;
}
</style>
