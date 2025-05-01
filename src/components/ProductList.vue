<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Available Products</h2>
        <ul>
            <li v-for="product in products" :key="product.id" class="border-b py-3 flex justify-between">
                <span>{{ product.name }}</span>
                <span class="text-gray-700 font-semibold">${{ product.price }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    data() {
        return {
            products: [],
        };
    },
    created() {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
                this.products = data;
            });
    },
};
</script>