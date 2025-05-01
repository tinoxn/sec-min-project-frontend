<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Orders</h1>
        <ul>
            <li v-for="order in orders" :key="order.id" class="border p-2 mb-2">
                <router-link :to="'/orders/' + order.id">
                    <p>{{ order.customer_name }} - {{ order.status }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'OrderList',
    data() {
        return {
            orders: [],
        };
    },
    created() {
        fetch('/api/orders')
            .then((response) => response.json())
            .then((data) => {
                this.orders = data;
            });
    },
};
</script>

<style scoped>
/* Styles specific to this component */
</style>