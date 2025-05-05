<template>
    <label class="flex mr-4 items-center flex-nowrap text-gray-700 font-medium">
        <input type="radio" name="show" value="all" checked @change="filter">
        <span class="whitespace-nowrap ml-1">show all</span>
    </label>
    <label class="flex mr-4 items-center flex-nowrap text-gray-700 font-medium">
        <input type="radio" name="show" value="today" @change="filter">
        <span class="whitespace-nowrap ml-1">due today</span>
    </label>
    <label class="flex mr-4 items-center flex-nowrap text-gray-700 font-medium">
        <input type="radio" name="show" value="past" @change="filter">
        <span class="whitespace-nowrap ml-1">past due</span>
    </label>
</template>

<script>
export default {
    name: "RadioFilter",
    emits: ['filter'],
    setup(props, { emit }) {
        const filter = (e) => {
            emit('filter', e.target.value);
        }
        return {
            filter
        }
    }
}
</script>
