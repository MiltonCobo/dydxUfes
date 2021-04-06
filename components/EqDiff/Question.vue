<template>
  <v-container fluid>
    <v-row>
      <v-col
        style="border: 1px solid green; padding: 1rem;"
        class="green lighten-5"
      >
        <h3 style="color:green;">
          <slot name="exercise"> </slot>
        </h3>

        <v-divider style="margin-bottom: 0.5rem;" />
        <p>
          <slot> </slot>
        </p>
      </v-col>
    </v-row>
    <v-spacer />
    <v-spacer />
  </v-container>
</template>

<style scoped></style>
