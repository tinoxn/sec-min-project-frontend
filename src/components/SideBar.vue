<template>
    <aside class="w-60 bg-gray-600 text-white min-h-full">
        <div class="p-5 text-xl font-bold">Order Management System</div>
        <nav class="mt-4 space-y-2">
            <router-link to="/" class="block px-5 py-3 text-gray-300 hover:bg-gray-800 rounded">
                Dashboard
            </router-link>
            <router-link to="/order" class="block px-5 py-3 text-gray-300 hover:bg-gray-800 rounded">
                Order
            </router-link>
            <router-link to="/catalog" class="block px-5 py-3 text-gray-300 hover:bg-gray-800 rounded">
                Catalog
            </router-link>
        </nav>
    </aside>
</template>

<script lang="js">
export default {
    name: "SideBar"
}
</script>