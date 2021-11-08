<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        Volver a Página de Inicio.
      </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  `No hay nada aquí.`,
  `¿Cómo llegaste acá?`,
  `Eso es un Cuatrocientos Cuatro.`,
  `Parece que tenemos algunos enlaces caidos.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
