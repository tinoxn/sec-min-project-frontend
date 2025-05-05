<template>
    <div>
        <form class="py-3 px-4 flex items-center" @submit.prevent>
            <label class="sr-only">search</label>
            <div class="relative w-full">
                <input type="text" placeholder="search" @input="search"
                    class="bg-gray-50 border-gray-300 border p-2  rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SearchForm',
    setup(props, { emit }) {
        const search = (e) => {
            emit('search', e.target.value)
        }
        return {
            search
        }
    }
}
</script>