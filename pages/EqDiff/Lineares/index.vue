<template>
  <div>
    <h1>
      Equações diferenciais lineares de primeira ordem.
    </h1>

    <h3>Os exercícios desta seção são os seguintes:</h3>

    <v-list v-for="(exercise, index) in exercises">
      <v-list-item nuxt link :to="exercise.route">
        <h3 class="green--text">{{ index + 1 }})--{{ exercise.title }}</h3>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercises: [
        {
          title: 'O problema dos mosquitos',
          route: '/EqDiff/Lineares/mosquitos'
        },
        { title: 'Eq. linear 2', route: '/EqDiff/Lineares/linear2' }
      ]
    }
  }
}
</script>

<style></style>
