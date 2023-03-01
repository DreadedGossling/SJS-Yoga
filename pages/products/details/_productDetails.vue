<template>
  <div>
    <v-simple-table class="my-10">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Slug</th>
            <th class="text-left">Summary</th>
            <th class="text-left">Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>{{ product.title }}</span></td>
            <td><span>{{ product.slug }}</span></td>
            <td><span>{{ product.summary }}</span></td>
            <td><span>{{ product.price }}</span></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th class="text-left">Category</th>
            <th class="text-left">Status</th>
            <th class="text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>{{ product.category }}</span></td>
            <td><span>{{ product.status }}</span></td>
            <td><span v-html="product.description"></span></td>
          </tr>
        </tbody>
      </template>
      <template v-slot:top>
        <v-toolbar flat class="my-5">
          <v-toolbar-title>Product Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="green" dark to="/products">Back</v-btn>
        </v-toolbar>
        <img class="image" :src="product.image" width="250px" height="250px" />
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  data: () => ({
    product: {},
  }),
  async mounted() {
    const db = getFirestore();
    const docRef = doc(db, "newProduct", this.$route.params.productDetails);
    try {
      const docSnap = await getDoc(docRef);
      const product = docSnap.data();
      // console.log(product);
      this.product = product;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.image {
  margin-left: 30%;
  margin-bottom: 2%;
  margin-top: 2%;
}
</style>