<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      disable-resize-watcher
      temporary
      clipped
      dense
      dark
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar height="80" width="80">
            <v-img position="center center" src="/figures/logo-ufes.jpg" />
            <!-- src="https://randomuser.me/api/portraits/men/19.jpg" -->
          </v-list-item-avatar>
          <span class="blue--text"> UFES </span>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="blue--text">
              Dpto de Matemática
            </v-list-item-title>
            <v-list-item-subtitle>Campus Goiabeiras</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list class="mx-n5" nav dense>
        <v-list-item
          class="px-n2"
          v-for="item in itemsDrawer"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon class="blue--text" small left>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <n-link :to="item.route" style="text-decoration: none;">
            <v-list-item-title class="mx-n6">{{
              item.title
            }}</v-list-item-title>
          </n-link>
        </v-list-item>
      </v-list>
      <v-divider />
      <div></div>
    </v-navigation-drawer>

    <v-app-bar inverted-scroll flat dark app>
      <v-app-bar-nav-icon class="blue--text" @click.stop="drawer = !drawer" />
      <v-spacer />
      <!-- <v-btn icon>
        <nuxt-link to="/">
          <v-icon> hide-on-scroll
            mdi-home
          </v-icon>
        </nuxt-link>
      </v-btn> -->

      <v-toolbar flat>
        <v-toolbar-title class="blue--text text-Capitalize">
          <nuxt-link to="/">
            Matemática-UFES
          </nuxt-link>
        </v-toolbar-title>
      </v-toolbar>

      <v-spacer />

      <!--   MENU CURSOS -->
      <v-menu
        :close-on-content-click="closeOnContentClick"
        text
        dense
        dark
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn class="blue--text" dark v-on="on">
            Cursos
          </v-btn>
        </template>

        <v-menu>
          <template close-on-content-click="false" v-slot:activator="{ on }">
            <v-list nav>
              <v-list-group
                v-on="on"
                v-for="curso in cursos"
                :key="curso.title"
                v-model="curso.active"
              >
                <template v-slot:activator>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title link :to="curso.route">
                        {{ curso.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <v-list
                  link
                  v-for="section in curso.sections"
                  :key="section.title"
                  @click=""
                  dense
                  no-action
                >
                  <v-list-item link nuxt :to="section.route">
                    <v-list-item-content>
                      <v-list-item-title class="blue--text">{{
                        section.title
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list
                    link
                    v-for="item in section.items"
                    :key="item.title"
                    @click=""
                    dense
                    no-action
                    rounded
                  >
                    <v-list-item class="mx-2" link nuxt :to="item.route">
                      <v-list-item-content>
                        <v-list-item-title class="green--text" link>{{
                          item.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-list>
              </v-list-group>
            </v-list>
          </template>
        </v-menu>
      </v-menu>
      <v-spacer />

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

    <v-content>
      <v-container fluid>
        <!-- <transition name="slide-fade" mode="out-in"> -->
        <nuxt />
        <!-- </transition> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  // theme: {
  //   dark: true
  // },
  created() {
    this.$vuetify.theme.dark = true
  },
  mounted() {
    if (!window.MathJax) {
      const script = document.createElement('script')
      //script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      document.head.appendChild(script)
    } else {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      //this.onScriptLoaded()
    }
  },
  destroyed() {
    this.$vuetify.theme.dark = false
  },
  methods: {
    onScriptLoaded(event = null) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },
  data() {
    return {
      drawer: false,
      closeOnContentClick: true,
      hideOnLeave: true,

      cursos,
      itemsDrawer: [
        { title: 'Inicial', icon: 'mdi-home', route: '/' },
        {
          title: 'Lorenz',
          icon: 'mdi-book-open-page-variant',
          route: '/lorenz'
        },
        {
          title: 'Lotka-Volterra',
          icon: 'mdi-book-open-page-variant',
          route: '/LotkaVolterra'
        }
      ]
    }
  }
}
let cursos = [
  {
    title: 'Eq. Diferenciais',
    active: false,
    sections: [
      {
        title: 'Eq. de 1a Ordem',
        route: '/EqDiff/Ordem1/',
        active: false,
        items: [
          { title: 'Eq. Linear', route: '/EqDiff/Ordem1/Lineares/' },
          { title: 'Eq. Separável', route: '/EqDiff/Ordem1/Separavel/' }
        ]
      },
      {
        title: 'Eq. de 2a Ordem',
        route: '/EqDiff/Ordem2',
        active: false,
        items: [
          { title: 'Coef. Constantes', route: '' },
          { title: 'Coef. Variáveis', route: '' }
        ]
      }
    ]
  }
]
</script>

<style scoped></style>
