<template>
    <!-- Card container with padding, white background, rounded corners, and shadow -->
    <div class="bg-white p-6 rounded-xl shadow-sm">

        <!-- Header section with title and optional icon slot -->
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-gray-700 font-medium">
                {{ title }}
            </h3>
            <!-- Slot for custom header icon (optional) -->
            <slot name="header-icon"></slot>
        </div>

        <!-- Main value display section -->
        <div class="mb-2">
            <!-- Numeric or string value -->
            <span class="text-3xl font-semibold">{{ value }}</span>
            <!-- Optional unit label (e.g., $, %, etc.) -->
            <span v-if="unit" class="text-gray-500 text-sm ml-2">{{ unit }}</span>
        </div>

        <!-- Optional trend indicator (e.g., +5%, -2%) -->
        <div v-if="trend" class="flex items-center text-sm mt-2">
            <!-- Trend text styled conditionally based on value -->
            <span :class="trendClass">{{ trendText }}</span>
        </div>

        <!-- Default slot for additional content (e.g., footer, charts) -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "InfoCard",

    // Props to customize the card content
    props: {
        // Main displayed value (number or text)
        value: {
            type: [Number, String],
            default: 0
        },

        // Title label shown at the top
        title: {
            type: String,
            required: true
        },

        // Optional unit (e.g., %, $, items)
        unit: {
            type: String,
            default: ''
        },

        // Optional trend value used to determine text color
        trend: {
            type: Number,
            default: null
        },

        // Text shown alongside the trend (e.g., '+5% this week')
        trendText: {
            type: String,
            default: ''
        }
    },

    // Computed property to return class based on trend direction
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
