<template>
  <v-card flat color="primary">
    <v-img>
      <v-carousel
          height="100%"
          hide-delimiters
          v-model="currentVideo"
      >
        <v-carousel-item
            v-for="(item,i) in videos"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
            style="line-height: 0"
        >
          <iframe
              v-if="currentVideo === i"
              style="width: 100%; aspect-ratio: 16/9"
              :src="'https://www.youtube.com/embed/'+ getVideoId(item) + '?autoplay=1&mute=1'"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
          >
          </iframe>
        </v-carousel-item>
      </v-carousel>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    videos: {
      type: Array,
      defualt: () => []
    }
  },
  data() {
    return {
      currentVideo: 0
    }
  },
  methods:{
    getVideoId(youtubeUrl){
      const url = new URL(youtubeUrl);
      const urlParams = new URLSearchParams(url.search);
      return urlParams.get('v');
    }
  }
}
</script>

<style lang="stylus">
.overlay-video {
  position: absolute;
  top: 0;
  color: #FFF;
  text-align: center;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 10px 0;
  z-index: 2147483647;
}

.fade-out {
  opacity: 0;
  animation: fadeOut ease 8s;
  -webkit-animation: fadeOut ease 8s;
  -moz-animation: fadeOut ease 8s;
  -o-animation: fadeOut ease 8s;
  -ms-animation: fadeOut ease 8s;
}

@keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
