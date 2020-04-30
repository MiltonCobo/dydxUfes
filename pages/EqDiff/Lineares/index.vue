<template>
  <div>
    <h1>
      Equações diferenciais lineares de primeira ordem.
    </h1>

    <h3>Os exercícios desta seção são os seguintes:</h3>

    <v-list v-for="(exercise, index) in exercises">
      <v-list-item nuxt link to="/EqDiff/Lineares/mosquitos">
        <h3 class="green--text">{{ index + 1 }})-{{ exercise }}</h3>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercises: ['O problema dos mosquitos']
    }
  }
}
</script>

<style></style>
