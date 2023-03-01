<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="customers"
        :items-per-page="5"
        class="elevation-2 mt-10"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Customers</v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <nuxt-link :to="'/customers/' + item.id"> Details </nuxt-link>
        </template>
      </v-data-table>
    </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("getCustomers");
  },
  data: () => ({
    headers: [
      { text: "Customer Name", value: "name" },
      { text: "No. of Orders", value: "orderitem" },
      { text: "Country", value: "country" },
      { text: "Actions", value: "actions" },
    ],
  }),
  computed: {
    customers() {
      return this.$store.state.customers;
    },
  },
};
</script>