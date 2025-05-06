<template>
    <div>
        <!-- Search form with input field -->
        <form class="py-3 px-4 flex items-center" @submit.prevent>
            <label class="sr-only">search</label> <!-- Label for accessibility (screen readers) -->
            <div class="relative w-full">
                <!-- Input field for searching, triggers search method on input -->
                <input type="text" placeholder="search" @input="search"
                    class="bg-gray-50 border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SearchForm',
    setup(props, { emit }) {
        // Method to handle search input and emit the value to the parent component
        const search = (e) => {
            emit('search', e.target.value); // Emit 'search' event with input value to parent component
        }
        return {
            search // Return the search method to be used in the template
        }
    }
}
</script>
