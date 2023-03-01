<template>
  <div class="content">
    <h2>Redirecting to Application, Please Wait......</h2>
    <div class="spinner"></div>
    <img :src="user.picture" width="150px" height="180px" /> -->
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
    const redirectResult = await auth0.handleRedirectCallback();
    const user = await auth0.getUser();
    //console.log(user);
    this.user = user;
    this.$store.dispatch("login", user);
    this.$router.push({
      path: "/profile",
    });
  },
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style scoped>
.content {
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.spinner {
  margin-top: 5%;
  height: 3em;
  width: 3em;
  border: 6px solid rgba(0, 174, 239, 0.2);
  border-top-color: rgba(0, 174, 239, 0.8);
  border-radius: 50%;
  animation: rotation 0.6s infinite linear;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>