<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      disable-resize-watcher
      mobile-breakpoint="1400"
      temporary
      dense
      dark
      app
    >
      <v-spacer />
      <v-list>
        <v-list-item style="position:30%;">
          <v-list-item-avatar width="80" height="80" contain>
            <img src="~/assets/figures/logo-ufes.jpg" />
          </v-list-item-avatar>
          <span class="blue--text"> UFES </span>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content style="font-size: min(2vmin, 15px)">
            <v-list-item-title class="blue--text">
              Matemática
            </v-list-item-title>
            <v-list-item-subtitle class="blue--text"
              >Campus Goiabeiras</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list class="mx-n5" nav dense>
        <v-list-item v-for="item in itemsDrawer" :key="item.title">
          <v-list-item-icon>
            <v-icon class="blue--text" left>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <n-link :to="item.route" style="text-decoration: none;">
            <v-list-item-title class="mx-n6">{{
              item.title
            }}</v-list-item-title>
          </n-link>
        </v-list-item>
      </v-list>
      <v-divider />

      <!-- ------------Chaotic attractots---------------------- -->

      <!-- <v-list-item> -->
      <!-- button inside list --->
      <v-menu bottom offset-x offset-y transition="slide-x-transition">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text class="blue--text">
            <!-- <v-list-item-icon>
              <v-icon class="blue--text">mdi-chart-bell-curve </v-icon>
            </v-list-item-icon> -->
            Atratores caóticos
          </v-btn>
        </template>
        <v-list dense dark>
          <v-list-item v-for="(attractor, i) in attractors" :key="i">
            <n-link :to="attractor.route" style="text-decoration: none;">
              <v-list-item-title>
                {{ attractor.name }}
              </v-list-item-title>
            </n-link>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- </v-list-item>
      </v-list> -->
      <!-- <v-list dense>
        <v-list-group no-action>

          <template v-slot:activator value="false">
            <v-list-item-content>
              <v-list-item-subtitle dense class="blue--text"
                >Atratores Caóticos</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>

          <v-list-item v-for="(attractor, i) in attractors" :key="i">
            <n-link :to="attractor.route" style="text-decoration: none;">
              <v-list-item-title>
                {{ attractor.name }}
              </v-list-item-title>
            </n-link>
          </v-list-item>
        </v-list-group>
      </v-list> -->
    </v-navigation-drawer>

    <v-app-bar hide-on-scroll flat dark app>
      <v-app-bar-nav-icon class="blue--text" @click.stop="drawer = !drawer" />
      <v-spacer />

      <v-btn v-if="smallWindow" icon>
        <nuxt-link to="/">
          <v-icon>
            mdi-home
          </v-icon>
        </nuxt-link>
      </v-btn>

      <v-toolbar v-if="!smallWindow" flat>
        <v-toolbar-title class="blue--text text-Capitalize">
          <nuxt-link to="/" flat>
            Matemática-UFES
          </nuxt-link>
        </v-toolbar-title>
      </v-toolbar>

      <v-spacer />

      <!--   MENU CURSOS -->
      <v-menu text shaped dense dark offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="blue--text" dark v-on="on">
            Cursos
          </v-btn>
        </template>

        <!-- :close-on-content-click="closeOnContentClick" -->
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

    <v-main>
      <v-container fluid>
        <!-- <transition name="slide-fade" mode="out-in"> -->
        <nuxt />
        <!-- </transition> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted() {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    if (windowWidth < 400) {
      this.smallWindow = true
    }

    this.$store.setWindowWidth(windowWidth)
    this.$store.setWindowHeight(windowHeight)

    window.PlotlyConfig = { MathJaxConfig: 'local' }
  },
  // methods: {
  //   onScriptLoaded(event = null) {
  //     MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  //   }
  // },
  data() {
    return {
      drawer: false,
      smallWindow: false,
      closeOnContentClick: true,
      hideOnLeave: true,
      expandOnHover: true,
      cursos,
      attractors: [
        { name: 'Lorenz', route: '/Attractors/lorenz' },
        { name: 'Chen', route: '/Attractors/qichen' },
        { name: 'Halvorsen', route: '/Attractors/halvorsen' },
        { name: 'Chen-Lee', route: '/Attractors/chenlee' },
        { name: 'Three scroll', route: '/Attractors/3scroll' }
      ],
      itemsDrawer: [
        { title: 'Inicial', icon: 'mdi-home', route: '/' },

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
        active: true,
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
