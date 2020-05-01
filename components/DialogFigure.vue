<template>
  <v-dialog v-model="openFigure" max-width="600">
    <v-card>
      <v-card-actions>
        <line-chart v-if="openFigure" :chartdata="data" :options="options" />
        <v-card-text id="mathjax" style="font-family: Lucida Console;">
          Ao lado as soluções ... note que para $$a=-0.8$$ a soluções permanecem
          limitadas.
          <v-btn class="green lighten-2" text @click="openFigure = false">
            Voltar
          </v-btn>
        </v-card-text>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['data', 'options'],
  data() {
    return {
      openFigure: true
    }
  }
}
</script>
