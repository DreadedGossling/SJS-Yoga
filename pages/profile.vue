<template>
  <div>
    <div class="content">
    <h2><u>WELCOME USER</u></h2>
  </div>
    <div class="userData">
      <div class="photo">
        <img :src="userInfo.picture" width="150px" height="180px" />
      </div>
      <div class="details">
        <p><b>Name:</b> {{ userInfo.name }}</p>
        <p><b>E-mail:</b> {{ userInfo.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
.userData {
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  padding: 5%;
  /* border: 4px black solid; */
}
.photo{
  width: 50%;
  margin-left: 5%;
  /* padding: 5%; */
}
.details{
  width: 50%;
  padding: 5%;
  float: right;
  /* margin-right: 10%; */
}
</style>