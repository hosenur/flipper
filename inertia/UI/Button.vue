<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <button
    onclick="console.log('clicked')"
    :disabled="props.loading"
    class="bg-black text-white font-bold flex items-center justify-center w-full py-2 rounded cursor-pointer">
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
