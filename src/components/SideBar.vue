<template>
    <!-- Sidebar container with fixed width and background color -->
    <aside class="w-60 bg-gray-600 text-white min-h-full">
        <!-- Sidebar title -->
        <div class="p-5 text-xl font-bold">Order Management System</div>

        <!-- Navigation links -->
        <nav class="mt-4 space-y-2">
            <!-- Dashboard link with hover effect -->
            <router-link to="/" class="block px-5 py-3 text-gray-300 hover:bg-gray-800 rounded">
                Dashboard
            </router-link>
            <!-- Order link with hover effect -->
            <router-link to="/order" class="block px-5 py-3 text-gray-300 hover:bg-gray-800 rounded">
                Order
            </router-link>
            <!-- Catalog link with hover effect -->
            <router-link to="/catalog" class="block px-5 py-3 text-gray-300 hover:bg-gray-800 rounded">
                Catalog
            </router-link>
        </nav>
    </aside>
</template>

<script lang="js">
export default {
    name: "SideBar" // Component name
}
</script>
