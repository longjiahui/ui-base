<template>
  <ADropdown :trigger>
    <slot></slot>
    <template v-if="$slots.body" #overlay>
      <slot name="body"></slot>
    </template>
  </ADropdown>
</template>
<script setup lang="ts">
defineProps<{
  trigger?: "click" | "hover" | "contextmenu"
}>()
</script>
