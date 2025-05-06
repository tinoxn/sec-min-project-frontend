<template>
    <div class="min-h-screen bg-blue-50">
        <div class="max-w-12xl mx-auto p-3">
            <div class="flex min-h-screen rounded-xl shadow-lg overflow-hidden flex">
                <!-- Sidebar component: Contains navigation and links -->
                <SideBar />
                <!-- Main Content section -->
                <main class="flex-1 flex flex-col">
                    <!-- Header component: Displays the page header -->
                    <HeaderBar />
                    <!-- Body section: Contains the main content of the page -->
                    <div class="p-6 flex-1 overflow-y-auto">
                        <!-- Section Header: Displays the title and icon for the overview section -->
                        <div class="flex items-center justify-between mb-6 border-b">
                            <div class="flex items-center space-x-2 pb-5">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                <h1 class="text-2xl font-semibold text-gray-800">Overview</h1>
                            </div>
                        </div>
                        <div class="flex gap-6">
                            <!-- InfoCard component: Displays the number of products and orders with loading state -->
                            <InfoCard title="Number of Products" :value="productCount" unit="Products" class="w-full"
                                :isLoading="isLoadingProducts" />
                            <InfoCard title="Number of Orders" :value="orderCount" unit="Orders" :trend="orderTrend"
                                trendText="Last 7 days" class="w-full" :isLoading="isLoadingOrders" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import InfoCard from "@/components/InfoCard.vue";
import orderService from "@/services/orderService";

export default {
    components: {
        SideBar,
        HeaderBar,
        InfoCard,
    },
    data() {
        return {
            // Data properties to hold product count, order count, trend, and loading states
            productCount: 0,
            orderCount: 0,
            orderTrend: 0,
            isLoadingProducts: false,
            isLoadingOrders: false,
        };
    },
    methods: {
        // Method to fetch product data
        async fetchProduct() {
            this.isLoadingProducts = true;
            try {
                const response = await orderService.getProduct(); // Call to service to fetch products
                this.productCount = response.length; // Set product count
            } catch (error) {
                console.error("Error fetching products:", error);
                this.productCount = 0; // Fallback in case of error
            } finally {
                this.isLoadingProducts = false; // Reset loading state
            }
        },
        // Method to fetch order data
        async fetchOrder() {
            this.isLoadingOrders = true;
            try {
                const response = await orderService.getOrders(); // Call to service to fetch orders
                this.orderCount = response.length; // Set order count
                // Calculate trend (placeholder for actual logic)
                this.orderTrend = this.calculateTrend(response); // Calculate trend based on orders
            } catch (error) {
                console.error("Error fetching orders:", error);
                this.orderCount = 0; // Fallback in case of error
                this.orderTrend = 0; // Reset trend
            } finally {
                this.isLoadingOrders = false; // Reset loading state
            }
        },
        // Method to calculate order trend based on the last 7 days
        calculateTrend(orders) {
            let trend = 0;
            const last7DaysOrders = orders.filter(order => {
                const orderDate = new Date(order.created_at);
                return (new Date() - orderDate) <= 7 * 24 * 60 * 60 * 1000; // Filter orders from the last 7 days
            });
            trend = last7DaysOrders.length; // Set trend to the count of orders in the last 7 days
            return trend;
        }
    },
    // Lifecycle hook to fetch data when the component is created
    created() {
        this.fetchProduct(); // Fetch product data
        this.fetchOrder(); // Fetch order data
    }
}
</script>
