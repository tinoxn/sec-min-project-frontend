<template>
    <div>
        <!-- Table to display products -->
        <table v-if="products.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <!-- Column for Product Name -->
                    <th scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product name
                    </th>
                    <!-- Column for Product Price -->
                    <th scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <!-- Loop through each product and display details -->
                <tr v-for="product in products" :key="product.id">
                    <!-- Product name column -->
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ product.name }}
                    </td>
                    <!-- Product price column, formatted -->
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatPrice(product.price) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Display message if no products found -->
        <div v-else class="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
            No products found
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        // List of products to be displayed
        products: {
            type: Array,
            required: true
        }
    },
    methods: {
        // Format the price to a currency format
        formatPrice(price) {
            const numericPrice = parseFloat(price);
            if (isNaN(numericPrice)) return '$0.00'; // Return '$0.00' if the price is invalid
            return `$${numericPrice.toFixed(2)}`; // Return the price formatted as currency
        }
    }
};
</script>
