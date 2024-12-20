<template>
  <ATooltip overlay-class-name="pointer-events-none" :title="content">
    <template #title v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <slot></slot
  ></ATooltip>
</template>
<script setup lang="ts">
defineProps<{ content?: string }>()
</script>
