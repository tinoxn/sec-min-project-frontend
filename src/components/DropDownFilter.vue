<template>
    <!-- Container for the dropdown filter button -->
    <div class="relative flex items-center w-full px-4">

        <!-- Toggle dropdown on click -->
        <button @click="show = !show"
            class="flex items-center justify-between w-full py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 rounded-lg transition-colors duration-200">
            <span>Filter </span>

            <!-- Arrow icon rotates when dropdown is open -->
            <svg class="w-4 h-4 ml-2 transition-transform duration-200" :class="{ 'rotate-180': show }" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <!-- Dropdown panel visible when 'show' is true -->
        <div v-if="show"
            class="absolute top-12 right-0 z-10 w-56 p-3 bg-white rounded-lg shadow-lg border border-gray-100">

            <!-- Title for the filter section -->
            <h6 class="mb-2 text-sm font-semibold text-gray-700">Filter by Status</h6>

            <!-- List of available status checkboxes -->
            <ul class="space-y-1.5">
                <li v-for="(status, index) in availableStatuses" :key="index"
                    class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">

                    <!-- Checkbox input for each status -->
                    <input :id="`filter_option_${index}`" @change="filter" type="checkbox" :value="status"
                        v-model="selectedStatuses"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer">

                    <!-- Label with colored dot and status name -->
                    <label :for="`filter_option_${index}`"
                        class="ml-2.5 text-sm font-normal text-gray-700 flex items-center cursor-pointer">
                        <span class="inline-block w-2 h-2 rounded-full mr-2" :class="getStatusColor(status)"></span>
                        {{ status }}
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
    name: 'DropDownFilter',

    // Optional list of orders to derive filter options
    props: {
        orders: {
            type: Array,
            required: false,
            default: () => []
        }
    },

    // Emits the selected filter value
    emits: ['filter'],

    setup(props, { emit }) {
        // Controls dropdown visibility
        const show = ref(false);

        // Tracks selected statuses
        const selectedStatuses = ref([]);

        // Emits selected value when checkbox changes
        const filter = (e) => {
            emit('filter', e.target.value);
        }

        // Computes unique status values from orders
        const availableStatuses = computed(() => {
            if (!props.orders?.length) return [];
            return [...new Set(props.orders.map(order => order.status))];
        });

        // Maps status strings to Tailwind CSS color classes
        const getStatusColor = (status) => {
            const statusColors = {
                'pending': 'bg-yellow-500',
                'completed': 'bg-green-500',
                'cancelled': 'bg-red-500',
                'shipped': 'bg-purple-500',
            };
            return statusColors[status] || 'bg-gray-400';
        };

        return {
            show,
            availableStatuses,
            selectedStatuses,
            getStatusColor,
            filter
        };
    }
}
</script>
