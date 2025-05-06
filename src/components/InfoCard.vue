<template>
    <div class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-gray-700 font-medium">
                {{ title }}
            </h3>
            <slot name="header-icon"></slot>
        </div>
        <div class="mb-2">
            <span class="text-3xl font-semibold">{{ value }}</span>
            <span v-if="unit" class="text-gray-500 text-sm ml-2">{{ unit }}</span>
        </div>
        <div v-if="trend" class="flex items-center text-sm mt-2">
            <span :class="trendClass">{{ trendText }}</span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "InfoCard",
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        title: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            default: ''
        },
        trend: {
            type: Number,
            default: null
        },
        trendText: {
            type: String,
            default: ''
        }
    },
    computed: {
        trendClass() {
            if (this.trend === null) return '';
            return this.trend >= 0
                ? 'text-green-500'
                : 'text-red-500';
        }
    }
}
</script>