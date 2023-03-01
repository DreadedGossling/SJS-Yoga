<template>
  <div>
    <div class="pa-4 mt-5">
      <v-row class="mt-6">
        <v-btn to="/products" color="red" dark class="mb-2"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-2" @click="update()"> Update </v-btn>
        <v-btn color="primary" class="ml-2" @click="wait()">
          Save As Draft
        </v-btn>
      </v-row>
    </div>
    <div class="pa-4 mt-5">
      <v-row cols="12">
        <div cols="4" class="first">
          <v-col>
            <img src="/images/modify-product-details.png" alt="" width="100%" />
          </v-col>
        </div>

        <div cols="8" class="second">
          <v-col>
            <v-text-field label="Title" v-model="product.title"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Image" v-model="product.image"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Summary"
              v-model="product.summary"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              :items="['Sport', 'Dessert', 'Beverage', 'Movies']"
              label="Category"
              v-model="product.category"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-text-field label="Price" v-model="product.price"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Slug" v-model="product.slug"></v-text-field>
          </v-col>
        </div>
      </v-row>
    </div>

    <div class="pa-4 mt-2">
      <v-col
        cols="12"
        sm="12"
        md="12"
        label="Description"
        
        ><ClientOnly>
          <!-- Use the component in the right place of the template -->
          <tiptap-vuetify v-model="product.description" :extensions="extensions" />

          <template #placeholder> Loading... </template>
        </ClientOnly>
        <!-- <Editor /> -->
      </v-col>
    </div>
  </div>
</template>


<script>
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
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
  History
} from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  data() {
    return {
      product: {},
      product: {
        title: "",
        image: "",
        summary: "",
        category: "",
        price: "",
        slug: "",
        description: "",
      },
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
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    // starting editor's content
    // content: ``
    };
  },

  async mounted() {
    const db = getFirestore();
    // console.log(this.$route.params.products);
    const docRef = doc(db, "newProduct", this.$route.params.products);
    try {
      const docSnap = await getDoc(docRef);
      const product = docSnap.data();
      // console.log(product);
      this.product = product;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    wait() {
      alert("Saved As Draft");
    },
    update() {
      const db = getFirestore();

      const docRef = doc(db, "newProduct", this.$route.params.products);

      const data = {
        title: this.product.title,
        image: this.product.image,
        summary: this.product.summary,
        category: this.product.category,
        price: this.product.price,
        slug: this.product.slug,
        description: this.product.description,
      };

      updateDoc(docRef, data)
        .then((docRef) => {
          alert("The document Updated Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
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