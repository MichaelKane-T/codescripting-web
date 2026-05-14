<template>
  <section class="rounded-xl border border-cyan-300/20 bg-[rgba(8,16,24,0.9)] p-3 shadow-lg shadow-cyan-950/20 sm:p-4">
    <h2 class="mb-3 text-[0.6rem] uppercase tracking-[0.25em] text-cyan-300/80 sm:text-[0.65rem]">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script setup>
defineProps({ title: String })
</script>