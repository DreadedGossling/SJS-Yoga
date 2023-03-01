<template>
  <div class="first">
    <v-btn @click="login">Log In</v-btn>
  </div>
</template>

<script>
import { createAuth0Client } from "@auth0/auth0-spa-js";

export default {
  layout: "login",
  async mounted() {
    const auth0 = await createAuth0Client({
      domain: "dev-un0znvtglxan51ta.us.auth0.com",
      clientId: "gtcMGNkMDsmFTI0Pfaz82fpjbf086otM",
      authorizationParams: {
        redirect_uri: location.origin + "/redirect",
      },
    });
    console.log(auth0);
    this.auth0 = auth0;
  },
  data() {
    return {
      auth0: {},
    };
  },
  methods: {
    async login() {
      await this.auth0.loginWithRedirect();
      // await this.auth0.logout({
      //   clientId: "gtcMGNkMDsmFTI0Pfaz82fpjbf086otM"
      // })
      // this.$store.dispatch("login");
      //   this.$router.push({
      //     path: "/products",
      //   });
    },
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.first {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  height: 100vh;
}
</style>