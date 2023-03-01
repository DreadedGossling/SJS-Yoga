<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="5"
      sort-by="name"
      class="elevation-1 mt-10"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Categories</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                + CREATE NEW ENTRY
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <h5>{{ formTitle }}</h5>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.Name"
                        label="Name"
                        value="title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="8" md="12">
                      <v-select
                        :items="['Sport', 'Dessert', 'Beverage', 'Movies']"
                        label="Sub-Categories"
                      >
                        <template v-slot:item="{ item, attrs, on }">
                          <v-list-item v-bind="attrs" v-on="on">
                            <v-list-item-title
                              :id="attrs['aria-labelledby']"
                              v-text="item"
                            ></v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      v-model="editedItem.description"
                      label="Description"
                      value="description"
                    >
                      <Editor />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn color="blue darken-1" text @click="save()">
                  Publish
                </v-btn>
                <v-btn color="blue darken-1" text @click="save()">
                  Save As Draft
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close()"> Cancel </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("getProducts");
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "title" },
      { text: "Description", value: "description" },
      { text: "SubCategory", value: "category" },
      { text: "Actions", value: "actions" },
    ],
    editedIndex: -1,
    editedItem: {
      Name: "",
      Description: "",
      SubCategory: "",
      status: "",
    },
    defaultItem: {
      Name: "",
      Description: "",
      SubCategory: "",
      Status: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    products() {
      return this.$store.state.products;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // created() {
  //   this.initialize();
  // },

  methods: {
    initialize() {
      this.products = [
        {
          name: "Eclair",
          subCategory: "food",
          description:
            "An éclair is a pastry made with choux dough filled with a cream and topped with a flavored icing. The dough, which is the same as that used for profiterole, is typically piped into an oblong shape with a pastry bag and baked until it is crisp and hollow inside.",
          products: 1,
          status: this.switch1,
        },
        {
          name: "Cupcake",
          subCategory: "food",
          description:
            "A cupcake (also British English: fairy cake; Hiberno-English: bun) is a small cake designed to serve one person, which may be baked in a small thin paper or aluminum cup. As with larger cakes, frosting and other cake decorations such as fruit and candy may be applied.",
          products: 20,
          status: this.switch1,
        },
        {
          name: "Gingerbread",
          subCategory: "food",
          description:
            "Gingerbread refers to a broad category of baked goods, typically flavored with ginger, cloves, nutmeg, and cinnamon and sweetened with honey, sugar, or molasses. Gingerbread foods vary, ranging from a soft, moist loaf cake to forms nearly as crisp as a ginger snap.",
          products: 8,
          status: this.switch1,
        },
        {
          name: "Jelly bean",
          subCategory: "food",
          description:
            "Jelly beans are small bean shaped sugar candies with soft candy shells and thick gel interiors (see gelatin and jelly). The confection is primarily made of sugar and sold in a wide variety of colors and flavors.",
          products: 90,
          status: this.switch1,
        },
        {
          name: "Lollipop",
          subCategory: "food",
          description:
            "A lollipop is a type of sugar candy usually consisting of hard candy mounted on a stick and intended for sucking or licking. Different informal terms are used in different places, including lolly, sucker, sticky-pop, etc. Lollipops are available in many flavors and shapes.",
          products: 19,
          status: this.switch1,
        },
        {
          name: "Honeycomb",
          subCategory: "food",
          description:
            "A honeycomb is a mass of hexagonal prismatic wax cells built by honey bees in their nests to contain their larvae and stores of honey and pollen.",
          products: 80,
          status: this.switch1,
        },
        {
          name: "Donut",
          subCategory: "food",
          description:
            "A doughnut or donut is a type of food made from leavened fried dough. 275  It is popular in many countries and is prepared in various forms as a sweet snack that can be homemade or purchased in bakeries, supermarkets, food stalls, and franchised specialty vendors. Doughnut is the traditional spelling, while donut is the simplified version; the terms are used interchangeably.",
          products: 10,
          status: this.switch1.toString(),
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>