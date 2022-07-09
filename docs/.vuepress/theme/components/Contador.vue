<template>
  <v-row class="secondary" justify="center">
    <v-col cols="12" md="10" class="py-0">
      <v-row justify="center" no-gutters>
        <v-col
            class="py-1 votacion"
            :class="{'text-center': $vuetify.breakpoint.smAndDown, 'text-right': $vuetify.breakpoint.mdAndUp}"
            cols="12"
            md="3"
            lg="4"
        >
          Faltan
        </v-col>
        <v-col class="py-1 " cols="12" md="6" lg="4">
          <v-row justify="center">
            <v-col cols="auto">
              <v-row class="time-number" justify="center" no-gutters>
                {{ time.days }}
              </v-row>
              <v-row class="time-text" justify="center" no-gutters>
                Días
              </v-row>
            </v-col>
            <v-col cols="auto">
              <v-row justify="center" class="time-number" no-gutters>
                {{ time.hours }}
              </v-row>
              <v-row class="time-text" justify="center" no-gutters>
                Horas
              </v-row>
            </v-col>
            <v-col cols="auto">
              <v-row justify="center" class="time-number" no-gutters>
                {{ time.minutes }}
              </v-row>
              <v-row class="time-text" justify="center" no-gutters>
                Minutos
              </v-row>
            </v-col>
            <v-col cols="auto">
              <v-row justify="center" class="time-number" no-gutters>
                {{ time.seconds }}
              </v-row>
              <v-row class="time-text" justify="center" no-gutters>
                Segundos
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col
            cols="12"
            md="3"
            lg="4"
            class="py-1 votacion" :class="{'text-center': $vuetify.breakpoint.smAndDown}"
            ref="votacion2"
        >
          para elegir una nueva constitución
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
  mounted() {
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
