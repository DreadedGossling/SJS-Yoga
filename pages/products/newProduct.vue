<template>
  <div>
    <div class="pa-4 mt-5">
      <v-row class="mt-6">
        <v-btn to="/products" color="red" dark class="mb-2"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-2" @click="save()"> Publish </v-btn>
        <v-btn color="primary" class="ml-2" @click="draft()">
          Save As Draft
        </v-btn>
      </v-row>
    </div>

    <div class="pa-4 mt-5">
      <v-row cols="12">
        <div cols="4" sm="4" md="4" class="first">
          <v-col>
            <img src="/images/add-product.png" alt="" width="100%" />
          </v-col>
        </div>

        <div cols="8" class="second">
          <v-col>
            <v-text-field v-model="title" label="Title" value=""></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="image" label="Image" value=""></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="summary"
              label="Summary"
              value=""
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              :items="['Sport', 'Dessert', 'Beverage', 'Movies']"
              v-model="category"
              value=""
              label="Category"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-text-field v-model="price" label="Price" value=""></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="slug" label="Slug" value=""></v-text-field>
          </v-col>
        </div>
      </v-row>
    </div>

    <div class="pa-4 mt-2">
      <v-col cols="12" sm="12" md="12" label="Description" value="">
        <ClientOnly>
          <tiptap-vuetify v-model="description" :extensions="extensions" />

          <template #placeholder> Loading... </template>
        </ClientOnly>
      </v-col>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
export default {
  components: { TiptapVuetify },
  data: () => ({
    image: "",
    slug: "",
    title: "",
    summary: "",
    description: "",
    price: "",
    category: "",

    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
  methods: {
    save() {
      try {
        alert("Yay! The product " + this.title + " added successfully");
        const db = getFirestore();
        const dbRef = collection(db, "newProduct");
        const data = {
          image: this.image,
          slug: this.slug,
          title: this.title,
          summary: this.summary,
          description: this.description,
          price: this.price,
          category: this.category,
        };
        addDoc(dbRef, data).then((docRef) => {
          console.log("Document has been added successfully");
        });
      } catch (error) {
        console.log(error);
      }
    },

    draft() {
      console.log(this.title);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.first {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  width: 40%;
}
.second {
  justify-content: center;
  align-items: center;
  padding: 5%;
  width: 60%;
}
</style>