 <template>
  <div>
    <v-simple-table class="elevation-2 mt-10">
      <template>
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Total</th>
            <th class="text-left">Slug</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img :src="order.image" width="150px" height="180px" />
            </td>
            <td>
              <span>{{ order.total }}</span>
            </td>
            <td>
              <span>{{ order.slug }}</span>
            </td>
            <td>
              <span>{{ order.status }}</span>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-slot:top>
        <v-toolbar flat class="my-5">
          <v-toolbar-title>Order #{{ order.id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="green" dark to="/orders">Back to Orders Page</v-btn>
        </v-toolbar>
        <div class="ml-4">
          <p>{{ formattedDate() }}</p>
        </div>
        <hr />
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import moment from "moment";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  data: () => ({
    order: {},
  }),
  async mounted() {
    const db = getFirestore();
    const docRef = doc(db, "orders", this.$route.params.order);
    try {
      const docSnap = await getDoc(docRef);
      const order = docSnap.data();
      console.log(order);
      this.order = order;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    formattedDate() {
      return moment(this.order.updatedAt).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>