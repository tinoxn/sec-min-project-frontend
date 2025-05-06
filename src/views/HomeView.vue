<template>
    <div class="min-h-screen bg-blue-50">
        <div class="max-w-12xl mx-auto p-3">
            <div class="flex min-h-screen rounded-xl shadow-lg overflow-hidden flex">
                <!-- Sidebar -->
                <SideBar />
                <!-- Main Content -->
                <main class="flex-1 flex flex-col">
                    <!-- Header -->
                    <HeaderBar />
                    <!-- Body -->
                    <div class="p-6 flex-1 overflow-y-auto">
                        <!-- Section Header -->
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
                            <InfoCard title="Number of Products" :value="productCount" unit="Products" class="w-full">
                            </InfoCard>
                            <InfoCard title="Number of Orders" :value="orderCount" unit="Orders" :trend="orderTrend"
                                trendText="Last 7 days" class="w-full" />

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
orderService
export default {
    components: {
        SideBar,
        HeaderBar,
        InfoCard,
    }, data() {
        return {
            productCount: 0,
            orderCount: 0,
            orderTrend: 0
        };
    },
    methods: {
        async fetchProduct() {
            try {
                const response = await orderService.getProduct();
                this.productCount = response.length;
            } catch (error) {
                console.error("Error fetching products:", error);
                this.productCount = 0;
            }
        },
        async fetchOrder() {
            try {
                const response = await orderService.getOrders();
                this.orderCount = response.length;
                // Calculate trend if needed
                // this.orderTrend = calculateTrend(response);
            } catch (error) {
                console.error("Error fetching orders:", error);
                this.orderCount = 0;
            }
        }
    },
    created() {
        this.fetchProduct();
        this.fetchOrder();
    }

}
</script>