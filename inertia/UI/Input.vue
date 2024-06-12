<template>
  <input
    v-model="model"
    class="border rounded-md px-4 py-2 w-full" />
</template>

<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>
