<template>
    <div class="container mx-auto mt-10">
        <h1 class="text-3xl font-bold mb-6">Order Management Dashboard</h1>
        <ProductList />
    </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'

export default {
    name: 'HomeView',
    components: {
        ProductList,
    },
};
</script>

<style scoped>
/* Page-specific styles */
</style>