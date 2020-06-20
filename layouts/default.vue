<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      disable-resize-watcher
      mobile-breakpoint="1400"
      clipped
      temporary
      dense
      dark
      app
    >
      <v-spacer />
      <v-list>
        <v-list-item style="position:30%;">
          <v-list-item-avatar width="80" height="80" contain>
            <v-img src="/figures/logo-ufes.jpg" />
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
      <div></div>
    </v-navigation-drawer>

    <v-app-bar hide-on-scroll flat dark app>
      <v-app-bar-nav-icon class="blue--text" @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-btn icon>
        <nuxt-link to="/">
          <div style="width:60px; height:40;">
            <v-img src="/figures/ufes-logo4.png" />
          </div>
          <!-- <v-icon>
            mdi-home
          </v-icon> -->
        </nuxt-link>
      </v-btn>

      <v-toolbar flat>
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
      expandOnHover: true,
      cursos,
      itemsDrawer: [
        { title: 'Inicial', icon: 'mdi-home', route: '/' },
        {
          title: 'Lorenz',
          icon: 'mdi-book-open-page-variant',
          route: '/about'
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
