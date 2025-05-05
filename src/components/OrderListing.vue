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
                    <th class="px-4 py-2">Order Number</th>
                    <th class="px-4 py-2">Customer</th>
                    <th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in filteredOrders" :key="order.id" class="border-t">
                    <td class="px-4 py-2">{{ order.order_number }}</td>
                    <td class="px-4 py-2">{{ order.customer_name }}</td>
                    <td class="px-4 py-2">{{ order.status }}</td>
                    <td class="px-4 py-2">{{ order.order_date }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else class="p-4 text-center text-gray-500">
            No orders found
        </div>
    </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"
import RadioFilter from "./RadioFilter.vue";
import DropDownFilter from "./DropDownFilter.vue";

export default {
    name: 'OrderListing',
    components: { SearchForm, RadioFilter, DropDownFilter },
    props: {
        orders: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            searchFilter: '',
            radiofilterVariable: '',
            statusesFilter: []
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