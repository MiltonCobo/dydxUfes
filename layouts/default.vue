<template>
  <v-app>
    <v-app-bar hide-on-scroll flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon>
        <nuxt-link to="/">
          <v-icon left>
            mdi-home
          </v-icon>
        </nuxt-link>
      </v-btn>
      <v-toolbar-title class="blue--text text-uppercase">
        universidade federal do espírito santo
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <nuxt-link to="/about">
          <v-icon>mdi-book-open-page-variant</v-icon>
        </nuxt-link>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              width=""
              position="center right"
              src="https://randomuser.me/api/portraits/men/19.jpg"
            />
          </v-list-item-avatar>
          <span> Milton Cobo </span>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Milton Cobo
            </v-list-item-title>
            <v-list-item-subtitle>milton@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container class="fill-height" fluid>
        <!--style="margin: 0px; padding: 0px; width: 100%; height:100%"-->
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home' },
        { title: 'About', icon: 'mdi-account' }
      ]
    }
  },
  methods: {
    clique() {
      this.drawer = !this.drawer
    }
  }
}
</script>
