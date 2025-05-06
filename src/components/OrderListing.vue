<template>
    <div class="flex items-center justify-between">
        <!-- search bar -->
        <SearchForm @search="handleSearch" />
        <div class="flex items-center justify-end text-sm font-semibold">
            <RadioFilter @filter="handleRadioFilter" />
            <DropDownFilter :orders="orders" @filter="handleCheckBoxFilter" />
        </div>
        <!-- radio button -->
    </div>
    <div>
        <table v-if="filteredOrders && filteredOrders.length > 0" class="min-w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left">Order Number</th>
                    <th class="px-4 py-2 text-left">Customer</th>
                    <th class="px-4 py-2 text-left">Status</th>
                    <th class="px-4 py-2 text-left">Date</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in filteredOrders" :key="order.id" class="border-t">
                    <td class="px-4 py-2 text-left">{{ order.order_number }}</td>
                    <td class="px-4 py-2 text-left">{{ order.customer_name }}</td>
                    <td class="px-4 py-2 text-left">{{ order.status }}</td>
                    <td class="px-4 py-2 text-left">{{ order.order_date }}</td>
                    <td class="px-4 py-2 text-left">
                        <button @click="showOrderDetails(order)" class="inline-block focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16"
                                height="16" class="hover:text-blue-500 transition-colors">
                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path fill-rule="evenodd"
                                    d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="p-4 text-center text-gray-500">
            No orders found
        </div>

        <!-- Order Details Modal -->
        <div v-if="selectedOrder"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="text-xl font-bold">Order Details</h2>
                    <button @click="selectedOrder = null" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 class="font-semibold mb-2">Order Information</h3>
                        <p><span class="font-medium">Order Number:</span> {{ selectedOrder.order_number }}</p>
                        <p><span class="font-medium">Date:</span> {{ selectedOrder.order_date }}</p>
                        <p><span class="font-medium">Status:</span> {{ selectedOrder.status }}</p>
                    </div>

                    <div>
                        <h3 class="font-semibold mb-2">Customer Information</h3>
                        <p><span class="font-medium">Name:</span> {{ selectedOrder.customer_name }}</p>
                        <p v-if="selectedOrder.customer_email"><span class="font-medium">Email:</span> {{
                            selectedOrder.customer_email }}</p>
                        <p v-if="selectedOrder.customer_phone"><span class="font-medium">Phone:</span> {{
                            selectedOrder.customer_phone }}</p>
                    </div>
                </div>

                <div class="mt-6" v-if="selectedOrder.items && selectedOrder.items.length > 0">
                    <h3 class="font-semibold mb-2">Order Items</h3>
                    <table class="min-w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-2">Product</th>
                                <th class="text-left py-2">Quantity</th>
                                <th class="text-left py-2">Price</th>
                                <th class="text-left py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in selectedOrder.items" :key="index" class="border-b">
                                <td class="py-2">{{ item.product.name }}</td>
                                <td class="py-2">{{ item.quantity }}</td>
                                <td class="py-2">${{ item.price }}</td>
                                <td class="py-2">${{ item.total }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-4 text-right">
                    <p class="font-semibold">Order Total: ${{ calculateOrderTotal(selectedOrder) }}</p>
                </div>
                <div class="mt-6 border-t pt-4">
                    <h3 class="font-semibold mb-2">Update Status</h3>
                    <div class="flex items-center space-x-4">
                        <select v-model="selectedOrder.status" @change="updateOrderStatus"
                            class="border rounded px-3 py-2 w-full md:w-auto">
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button @click="confirmDeleteOrder"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded whitespace-nowrap">
                            Delete Order
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"
import RadioFilter from "./RadioFilter.vue";
import DropDownFilter from "./DropDownFilter.vue";
import orderService from "@/services/orderService";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
    name: 'OrderListing',
    components: { SearchForm, RadioFilter, DropDownFilter },
    props: {
        orders: {
            type: Array,
            required: true,
            default: () => []
        },
    },
    data() {
        return {
            searchFilter: '',
            radiofilterVariable: '',
            statusesFilter: [],
            selectedOrder: null,
            toast: useToast()
        };
    },
    methods: {
        handleSearch(search) {
            this.searchFilter = search;
        },
        handleRadioFilter(filter) {
            this.radiofilterVariable = filter
        },
        handleCheckBoxFilter(filter) {
            const index = this.statusesFilter.indexOf(filter);
            if (index !== -1) {
                this.statusesFilter.splice(index, 1);
            } else {
                this.statusesFilter.push(filter);
            }
        },
        showOrderDetails(order) {
            this.selectedOrder = order;
        },
        calculateOrderTotal(order) {
            if (!order.items) return '0.00';
            return order.items.reduce((total, item) => {
                return total + parseFloat(item.total || 0);
            }, 0).toFixed(2);
        },
        async updateOrderStatus() {
            try {
                const response = await orderService.updateStatus(
                    {
                        status: this.selectedOrder.status,
                        orderId: this.selectedOrder.id

                    })
                this.toast.success('Order with Id' + response.order_number + ' updated successfully!', {
                    position: 'top-right',
                    duration: 3000
                });
                this.$emit('status-updated', {
                    orderId: this.selectedOrder.id,
                    newStatus: this.selectedOrder.status
                });

            } catch (error) {
                this.toast.error('Failed to create order, ' + error.response.data.errors.status[0] + ' Please try again.', {
                    position: 'top-right',
                    duration: 5000
                });
            }
        },
        async confirmDeleteOrder() {
            let userConfirmed = confirm("Do you want to proceed?");
            if (userConfirmed) {
                this.deleteOrder(this.selectedOrder.id)
            } else {
                alert("You clicked Cancel!");
            }
        },
        async deleteOrder(orderId) {
            console.log('jj')
            try {
                await orderService.deleteOrder(orderId);
                this.toast.success('order deleted successful', {
                    position: 'top-right',
                    duration: 5000
                });
                window.location.reload();
                this.$emit('order-deleted', orderId);
            } catch (error) {
                this.toast.error('Failed to delete order. Please try again.', {
                    position: 'top-right',
                    duration: 5000
                });
            }
        }
    },
    computed: {
        filteredOrders() {
            let orders = this.orders;

            // Apply radio filter if set
            switch (this.radiofilterVariable) {
                case 'today': {
                    const today = new Date();
                    orders = orders.filter(order => {
                        const orderDate = new Date(order.order_date);
                        return orderDate.toDateString() === today.toDateString();
                    });
                    break;
                }
                case 'past': {
                    const now = new Date();
                    orders = orders.filter(order => new Date(order.order_date) < now);
                    break;
                }
            }

            // Apply checkbox (status) filter
            if (this.statusesFilter.length > 0) {
                orders = orders.filter(order => this.statusesFilter.includes(order.status));
            }

            // Apply search filter
            if (this.searchFilter) {
                const term = this.searchFilter.toLowerCase();
                orders = orders.filter(order =>
                    String(order.order_number).toLowerCase().includes(term) ||
                    order.customer_name.toLowerCase().includes(term)
                );
            }

            return orders;
        }
    }
};
</script>