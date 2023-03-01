<template>
  <div>
    <v-data-table
      v-model="selected"
      :single-select="singleSelect"
      item-key="slug"
      show-select
      :headers="headers"
      :items="products"
      :items-per-page="5"
      sort-by="slug"
      class="elevation-1 mt-10"
    >
      <template v-slot:item.image="{ item }">
        <img :src="item.image" style="width: 90px; height: 100px" />
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Products</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn to="/products/newProduct" color="primary" dark class="mb-2">
            + ADD NEW PRODUCT
          </v-btn>
          <!-- the dialog for delete was earlier refferenced here -->
        </v-toolbar>
      </template>

      <template v-slot:item.details="{ item }">
        <nuxt-link :to="'/products/details/' + item.id"> Details </nuxt-link>
      </template>

      <template v-slot:item.actions="{ item }">
        <nuxt-link :to="'/products/' + item.id">
          <v-icon small class="mr-2"> mdi-pencil </v-icon>
        </nuxt-link>
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export default {
  async mounted() {
    await this.$store.dispatch("getProducts");
  },
  data: () => ({
    singleSelect: false,
    selected: [],
    headers: [
      { text: "Image", value: "image" },
      { text: "Slug", value: "slug" },
      { text: "Title", value: "title" },
      { text: "Summary", value: "summary" },
      { text: "Price (INR)", value: "price" },
      { text: "Category", value: "category" },
      { text: "Status", value: "status" },
      { text: "Full Details", value: "details" },
      { text: "Actions", value: "actions" },
    ],
  }),

  computed: {
    products() {
      return this.$store.state.products;
    },
  },

  methods: {
    deleteItem(item) {
      if (confirm("You sure want to delete this product ?")) {
        const api = getFirestore();
        const docRef = doc(api, "newProduct", item);

        deleteDoc(docRef)
          .then(() => {
            console.log(
              "The Document with id: " + item + " is succesfully deleted"
            );
          })
          .catch((error) => {
            console.log(error);
          });
        alert("The Document with id: " + item + " is succesfully deleted");
      }
    },
  },
};
</script>




<!-- <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->