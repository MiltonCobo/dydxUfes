<template>
  <div>
    <v-container fluid>
      <v-row align="center">
        <p style="color: red;">...Carregando....</p>
        <img
          src="~/assets/figures/Slinear1.png"
          contain
          width="400"
          height="400"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('loading component was mounted in LoadingComp')
  }
}
</script>
