<template>
    <!-- Header container with padding, border, and background color -->
    <header class="flex justify-between text-left border-b px-6 py-4 bg-white">

        <!-- Profile section aligned to the right -->
        <div class="ml-auto flex items-center">
            <!-- Profile button with avatar and username -->
            <button class="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-100">

                <!-- Avatar circle with initials -->
                <div class="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center mr-2">
                    JD
                </div>

                <!-- Username -->
                <span class="font-medium">John Doe</span>

                <!-- Downward arrow icon -->
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    </header>
</template>

<script lang="js">
export default {
    // Component name
    name: "HeaderBar"
}
</script>
