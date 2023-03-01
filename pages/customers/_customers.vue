  <template>
  <v-simple-table class="my-10">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Order Item</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Email</th>
          <th class="text-left">City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>{{ customer.name }}</span>
          </td>
          <td>
            <span>{{ customer.orderitem }}</span>
          </td>
          <td>
            <span>{{ customer.phone }}</span>
          </td>
          <td>
            <span>{{ customer.email }}</span>
          </td>
          <td>
            <span>{{ customer.city }}</span>
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th class="text-left">Address</th>
          <th class="text-left">State</th>
          <th class="text-left">Country</th>
          <th class="text-left">PIN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>{{ customer.address }}</span>
          </td>
          <td>
            <span>{{ customer.state }}</span>
          </td>
          <td>
            <span>{{ customer.country }}</span>
          </td>
          <td>
            <span>{{ customer.pin }}</span>
          </td>
        </tr>
      </tbody>
    </template>
    <template v-slot:top>
      <v-toolbar flat class="my-5">
        <v-toolbar-title>Customer Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="green" dark to="/customers">Back To Customers</v-btn>
      </v-toolbar>
    </template>
  </v-simple-table>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  data: () => ({
    customer: {},
  }),
  async mounted() {
    const db = getFirestore();
    const docRef = doc(db, "customers", this.$route.params.customers);
    try {
      const docSnap = await getDoc(docRef);
      const customer = docSnap.data();
      // console.log(product);
      this.customer = customer;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>