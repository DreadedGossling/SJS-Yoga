// states
export const state = () => ({

  products: [],

  customers: [],

  orders: [],

  user: null,
})

// getters
export const getters = {

  products: state => {
    return state.products;
  },

  customers: state => {
    return state.orders;
  },

  orders: state => {
    return state.customers;
  },

  user: state => {
    return state.user
  },
}

// mutations
export const mutations = {

  setProducts(state, products) {
    state.products = products
  },

  setCustomers(state, customers) {
    state.customers = customers
  },


  setOrders(state, orders) {
    state.orders = orders
  },

  setUser(state, user) {
    state.user = user
  },
}

// actions
export const actions = {

  async getProducts({ commit }) {
    const api = await this.$fire.firestore.collection('newProduct').get();
    const products = api.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log(products)
    commit("setProducts", products);
  },

  async getCustomers({ commit }) {
    const api = await this.$fire.firestore.collection('customers').get();
    const categories = api.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log(categories)
    commit("setCustomers", categories);
  },

  async getOrders({ commit }) {
    const api = await this.$fire.firestore.collection('orders').get();
    const orders = api.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log(orders)
    commit("setOrders", orders);
  },

  login({ commit }, user) {
    console.log(user)
    commit('setUser', user)
  },

  logout({ commit }) {
    const user = null;
    commit("setUser", user)
    console.log("loggedout")
  },
}