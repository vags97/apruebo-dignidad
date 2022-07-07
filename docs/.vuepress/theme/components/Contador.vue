<template>
  <v-row class="secondary" justify="center">
    <v-col cols="auto">
      <v-row justify="center">
        <v-col cols="auto" class="pa-4">
          <v-row class="time-number" justify="center">
            {{ time.days }}
          </v-row>
          <v-row class="time-text" justify="center">
            Días
          </v-row>
        </v-col>
        <v-col cols="auto" class="pa-4">
          <v-row justify="center" class="time-number">
            {{ time.hours }}
          </v-row>
          <v-row class="time-text" justify="center">
            Horas
          </v-row>
        </v-col>
        <v-col cols="auto" class="pa-4">
          <v-row justify="center" class="time-number">
            {{ time.minutes }}
          </v-row>
          <v-row class="time-text" justify="center">
            Minutos
          </v-row>
        </v-col>
        <v-col cols="auto" class="pa-4">
          <v-row justify="center" class="time-number">
            {{ time.seconds }}
          </v-row>
          <v-row class="time-text" justify="center">
            Segundos
          </v-row>
        </v-col>
        <v-col
            cols="auto" class="py-1 votacion"
            v-if="false"
        >
          Para la Votación
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Contador",
  data(){
    return {
      time: {
        inicioVotacion: false,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  },
  created() {
    this.startTimer()
  },
  methods: {

    startTimer(){
      const countDownDate = new Date("Sep 4, 2022 8:00").getTime();
      let x = setInterval(() => {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        this.time.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.time.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.time.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.time.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
          clearInterval(x);
          this.time.inicioVotacion = true
        }
      })
    },
  }
}
</script>

<style scoped>
.time-number{
  color: white;
  font-weight: bold;
  text-transform: uppercase !important;
  font-size: 1.5rem;
}

.time-text{
  color: white;
  font-weight: bold;
  text-transform: uppercase !important;
}

.votacion{
  color: white;
  font-weight: bold;
  text-transform: uppercase !important;
  align-self: center;
  font-size: 1.5rem;
}
</style>
