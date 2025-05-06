<template>
    <div>
        <table v-if="products.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product name
                    </th>
                    <th scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>

                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="product in products" :key="product.id">
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ product.name }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatPrice(product.price) }}
                    </td>

                </tr>
            </tbody>
        </table>
        <div v-else class="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
            No products found
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatPrice(price) {
            const numericPrice = parseFloat(price);
            if (isNaN(numericPrice)) return '$0.00';
            return `$${numericPrice.toFixed(2)}`;
        }
    }
};
</script>