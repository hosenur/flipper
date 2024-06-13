<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  loading: {
    type: Boolean,
  },
});
</script>

<template>
  <button
    :disabled="props.loading"
    class="bg-gradient-to-b from-pigment-indigo-700 to-pigment-indigo-800 transition-all ease-in-out text-white font-semibold  flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer">
    <template v-if="props.loading">
      Loading...
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<style scoped>
</style>
