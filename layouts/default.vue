<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-spacer></v-spacer>
        <div class="my-6">
        <v-list-item @click="logout">
          <v-icon>mdi-bullet</v-icon>
          <v-list-item-content>
            <v-list-item-title> 
              <v-btn color="grey">Log Out</v-btn></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  // middleware({ store, redirect }) {
  //     if (!store.state.user) {
  //       return redirect('/login')
  //     }
  //   },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "STORE",
          to: "/profile",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Products",
          to: "/products",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Categories",
          to: "/categories",
        },
        {
          icon: "mdi-account",
          title: "Customers",
          to: "/customers",
        },
        {
          icon: "mdi-cart",
          title: "Orders",
          to: "/orders",
        },
        {
          icon: "mdi-tools",
          title: "Settings",
          to: "/settings",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({
      path: "/login",
    });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  }
};
</script>
