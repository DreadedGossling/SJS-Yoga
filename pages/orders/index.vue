<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-2 mt-10"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Orders</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <nuxt-link :to="'/orders/' + item.id"> Details </nuxt-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("getOrders");
  },
  data: () => ({
    headers: [
      { text: "Order id", value: "id" },
      { text: "No. of items", value: "items.length" },
      { text: "Total Price", value: "total" },
      { text: "Status", value: "status" },
      { text: "Full Details", value: "actions" },
    ],
  }),
  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },
};
</script>