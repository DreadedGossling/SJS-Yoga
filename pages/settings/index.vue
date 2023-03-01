<template>
  <v-container class="m-6">
    <v-row align="center">
      <v-col>
        <img src="v.png" alt="store image" />
      </v-col>
      <v-col>
        <v-btn depressed color="silver" elevation="2">Change
          <v-file-input accept="image/*"></v-file-input>
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col>
        <h3>Store Name</h3>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Store_name"></v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col>
        <h3>Currency:</h3>
      </v-col>

      <v-col cols="4" sm="4" md="4">
        <v-text-field label="$"></v-text-field>
      </v-col>
      <v-col cols="2" sm="2" md="2">
        <v-select :items="['INR', 'DNR', 'USD', 'EUR']" label="currency">
        </v-select>
      </v-col>
    </v-row>

    <v-row class="ma-8">
      <v-btn depressed color="blue darken-1" class="mx-2" @click="save()"> Publish </v-btn>
      <v-btn depressed color="blue darken-1" class="mx-2" @click="save()"> Save As Draft </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" to="/Categories"> Cancel </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("getProducts");
  },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  }
};
</script>