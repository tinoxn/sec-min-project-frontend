<template>
    <div class="min-h-screen bg-blue-50">
        <div class="max-w-12xl mx-auto p-4">
            <div class="flex min-h-screen rounded-xl shadow-lg overflow-hidden">
                <!-- Sidebar -->
                <SideBar />
                <!-- Main Content -->
                <main class="flex-1 flex flex-col">
                    <!-- Header -->
                    <HeaderBar />
                    <!-- Body -->
                    <div class="p-6 flex-1 overflow-y-auto">
                        <!-- Section Header -->
                        <div class="flex items-center justify-between mb-6 border-b pb-4">
                            <div class="flex items-center space-x-2">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                <h1 class="text-2xl font-semibold text-gray-800">Order Management</h1>
                            </div>
                        </div>

                        <div class="flex flex-col lg:flex-row gap-6">
                            <!-- Form section -->
                            <div class="w-full lg:max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
                                <form @submit.prevent="createOrder" class="space-y-4">
                                    <div>
                                        <div class="flex items-center space-x-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <label class="block text-gray-700">Customer Name</label>
                                        </div>
                                        <input v-model="data.customerName" type="text" required
                                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                    </div>

                                    <div>
                                        <div class="flex items-center space-x-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <label class="block text-gray-700">Order Date</label>
                                        </div>
                                        <input v-model="data.orderDate" type="date" required
                                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                    </div>
                                    <div>
                                        <div class="flex items-center space-x-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <label class="block text-gray-700">Select Products</label>
                                        </div>
                                        <v-select :options="filteredProducts" v-model="selectedProducts" label="name"
                                            :reduce="product => product.id" multiple searchable :filterable="false"
                                            @search="onSearch" @update:modelValue="updateSelectedProducts"
                                            placeholder="Type to search products..."
                                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                            <template #option="{ name, price }">
                                                <div class="flex justify-between">
                                                    <span>{{ name }}</span>
                                                    <span class="text-gray-500">${{ price }}</span>
                                                </div>
                                            </template>
                                            <template #selected-option="{ name, price }">
                                                <div class="selected-item">
                                                    {{ name }} (${{ price }})
                                                </div>
                                            </template>
                                            <template #no-options>
                                                <div class="p-2 text-gray-500">
                                                    Product not found!
                                                </div>
                                            </template>
                                        </v-select>

                                    </div>

                                    <!-- Submit Button -->
                                    <button type="submit" :disabled="isLoading"
                                        class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shadow-md w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span v-if="!isLoading">Process Order</span>
                                        <span v-else class="flex items-center justify-center">
                                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            <div class="w-full bg-white rounded-2xl p-6 shadow-sm">
                                <OrderListing :orders="orders" />

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "vue";
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import orderService from "@/services/orderService";
import OrderListing from "@/components/OrderListing.vue";
import { useToast } from "vue-toast-notification";
import vSelect from "vue3-select";
import { debounce } from 'lodash';


import "vue-toast-notification/dist/theme-sugar.css";
import "vue3-select/dist/vue3-select.css";

export default {
    components: {
        SideBar,
        HeaderBar,
        vSelect, OrderListing
    },

    setup() {
        const generateOrderId = () => {
            const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4 digits
            const timestamp = Math.floor(Date.now() / 1000).toString().slice(-6); // last 6 digits
            return `O-${randomNumber}-${timestamp}`;
        };

        const generateCustomerCode = () => {
            const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4 digits
            const timestamp = Math.floor(Date.now() / 1000).toString().slice(-6); // last 6 digits
            return `C-${randomNumber}-${timestamp}`;
        };

        const data = reactive({
            customerName: '',
            orderDate: '',
            orderNumber: generateOrderId(),
            status: 'pending',
            items: [],
            customerCode: generateCustomerCode()
        });

        const isLoading = ref(false);
        const toast = useToast();
        const products = ref([]);
        const selectedProducts = ref([]);
        const searchQuery = ref('');
        const orders = ref([]);

        // Computed property for filtered products
        const filteredProducts = computed(() => {
            if (!searchQuery.value) return products.value;

            const query = searchQuery.value.toLowerCase();
            return products.value.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.price.toString().includes(query)
            );
        });

        // Debounced search function
        const onSearch = debounce((query) => {
            searchQuery.value = query;
        }, 300);

        const createOrder = async () => {
            isLoading.value = true;
            try {
                console.log(data)
                const response = await orderService.saveOrder(data);
                console.log(response);

                toast.success('Order created successfully!', {
                    position: 'top-right',
                    duration: 3000
                });

                // Reset form
                data.customerName = '';
                data.orderDate = '';
                data.items = [];
                searchQuery.value = '';
            } catch (error) {
                console.error("Error saving order:", error);
                toast.error('Failed to create order. Please try again.', {
                    position: 'top-right',
                    duration: 3000
                });
            } finally {
                isLoading.value = false;
            }
        };

        const updateSelectedProducts = (selectedIds) => {
            const idsArray = Array.isArray(selectedIds) ? selectedIds : [];
            selectedProducts.value = idsArray;

            data.items = idsArray
                .map(productId => {
                    const product = products.value.find(p => p.id === productId);
                    return product ? {
                        product_id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        total: 1 * product.price

                    } : null;
                })
                .filter(Boolean);
        };

        const fetchProducts = async () => {
            try {
                const response = await orderService.getProduct();
                products.value = response.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    created_at: product.created_at,
                    updated_at: product.updated_at
                }));
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error('Failed to load products. Please try again.', {
                    position: 'top-right',
                    duration: 3000
                });
            }
        };
        const fetchOrders = async () => {
            try {
                const response = await orderService.getOrders();
                console.log(response)
                orders.value = response || [];
                console.log(orders.value);

            } catch (error) {
                console.log(error)
                orders.value = [];
            }
        }

        onMounted(() => {
            fetchProducts();
            fetchOrders();
        });

        return {
            data,
            products,
            filteredProducts,
            selectedProducts,
            searchQuery,
            createOrder,
            updateSelectedProducts,
            onSearch,
            isLoading,
            fetchProducts,
            generateCustomerCode,
            fetchOrders, orders
        };
    }
}
</script>

<style>
.selected-item {
    display: inline-block;
    margin: 2px;
    padding: 2px 6px;
    background-color: #e2e8f0;
    border-radius: 4px;
    font-size: 0.875rem;
}

/* Improve dropdown styling */
.vs__dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
}

/* Better search input styling */
.vs__search {
    padding: 0.5rem;
    border: none;
    outline: none;
}
</style>