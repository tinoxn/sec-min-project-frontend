<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Order Details</h1>
    <p><strong>Customer:</strong> {{ order.customer_name }}</p>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Order Date:</strong> {{ order.order_date }}</p>
    <ul>
      <li v-for="item in order.items" :key="item.id">
        <p>{{ item.product }} - {{ item.quantity }} x {{ item.price }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  props: ['id'],
  data() {
    return {
      order: {},
    };
  },
  created() {
    fetch(`/api/orders/${this.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.order = data;
      });
  },
};
</script>

<style scoped>
/* Styles specific to this component */
</style>