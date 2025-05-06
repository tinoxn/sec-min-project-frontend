<template>
    <!-- Radio button for showing all items -->
    <label class="flex mr-4 items-center flex-nowrap text-gray-700 font-medium">
        <input type="radio" name="show" value="all" checked @change="filter">
        <span class="whitespace-nowrap ml-1">show all</span>
    </label>

    <!-- Radio button for showing items due today -->
    <label class="flex mr-4 items-center flex-nowrap text-gray-700 font-medium">
        <input type="radio" name="show" value="today" @change="filter">
        <span class="whitespace-nowrap ml-1">due today</span>
    </label>

    <!-- Radio button for showing past due items -->
    <label class="flex mr-4 items-center flex-nowrap text-gray-700 font-medium">
        <input type="radio" name="show" value="past" @change="filter">
        <span class="whitespace-nowrap ml-1">past due</span>
    </label>
</template>

<script>
export default {
    name: "RadioFilter",
    emits: ['filter'], // Emit 'filter' event to parent component when selection changes
    setup(props, { emit }) {
        // Method to handle radio button selection and emit the selected value
        const filter = (e) => {
            emit('filter', e.target.value); // Emit the selected value to the parent
        }
        return {
            filter // Return the filter method for use in the template
        }
    }
}
</script>
