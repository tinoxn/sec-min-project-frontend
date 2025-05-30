<template>
    <div class="min-h-screen bg-blue-50">
        <!-- Main container -->
        <div class="max-w-12xl mx-auto p-4">
            <div class="flex min-h-screen rounded-xl shadow-lg overflow-hidden">
                <!-- Sidebar component -->
                <SideBar />
                <!-- Main Content -->
                <main class="flex-1 flex flex-col">
                    <!-- Header bar component -->
                    <HeaderBar />
                    <!-- Body section -->
                    <div class="p-6 flex-1 overflow-y-auto">
                        <!-- Section header -->
                        <div class="flex items-center justify-between mb-6 border-b pb-4">
                            <div class="flex items-center space-x-2">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <!-- Icon for catalog section -->
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                <h1 class="text-2xl font-semibold text-gray-800">Product Catalog</h1>
                            </div>
                        </div>

                        <!-- Main content sections (Form and product list) -->
                        <div class="flex flex-col lg:flex-row gap-6">
                            <!-- Form to create new product -->
                            <div class="w-full lg:max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
                                <form @submit.prevent="createProduct" class="space-y-4">
                                    <!-- Product name field -->
                                    <div>
                                        <div class="flex items-center space-x-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <label class="block text-gray-700">Product Name</label>
                                        </div>
                                        <input v-model="product.name" type="text" required
                                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                    </div>

                                    <!-- Product price field -->
                                    <div>
                                        <div class="flex items-center space-x-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <label class="block text-gray-700">Product Price</label>
                                        </div>
                                        <input v-model="product.price" type="number" required
                                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                    </div>

                                    <!-- Submit Button -->
                                    <button type="submit" :disabled="isLoading"
                                        class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shadow-md w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span v-if="!isLoading">Save Product</span>
                                        <span v-else class="flex items-center justify-center">
                                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <!-- Loading spinner when submitting -->
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                </path>
                                            </svg>
                                            Processing...
                                        </span>
                                    </button>
                                </form>
                            </div>

                            <!-- Product list section -->
                            <div class="w-full bg-white rounded-2xl p-6 shadow-sm">
                                <ProductList :products="products || []" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import ProductList from "@/components/ProductList.vue";
import orderService from "@/services/orderService";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
    // Register components used in this template
    components: {
        SideBar,
        HeaderBar,
        ProductList
    },

    setup() {
        // Reactive state for the product form data
        const product = reactive({
            name: '',
            price: '',
        });
        // Ref for storing fetched products
        const products = ref([]);
        const isLoading = ref(false); // State to track loading state for form submission
        const toast = useToast(); // Toast notifications

        // Function to fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await orderService.getProduct(); // Fetch products
                products.value = response; // Store products data
            } catch (error) {
                console.error("Error fetching products:", error); // Handle errors
                products.value = []; // Set products to empty in case of error
            }
        };

        // Function to handle creating a new product
        const createProduct = async () => {
            isLoading.value = true; // Set loading state
            try {
                const response = await orderService.saveProduct(product); // Send request to save product
                console.log(response.data);

                // Show success notification
                toast.success('Product created successfully!', {
                    position: 'top-right',
                    duration: 3000
                });

                // Reset form fields
                product.name = '';
                product.price = '';

                // Refresh product list after creating a product
                await fetchProducts();
            } catch (error) {
                console.error("Error saving product:", error);
                // Show error notification
                toast.error('Failed to create product. Please try again.', {
                    position: 'top-right',
                    duration: 3000
                });
            } finally {
                isLoading.value = false; // Reset loading state
            }
        };

        // Fetch products when the component is mounted
        onMounted(() => {
            fetchProducts();
        });

        // Return reactive and ref values to the template
        return {
            product,
            products,
            createProduct,
            isLoading,
            fetchProducts
        };
    }
}
</script>
