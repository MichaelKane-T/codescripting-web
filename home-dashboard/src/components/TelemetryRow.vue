<script setup>
defineProps({
  label: String,
  value: [String, Number, Boolean],
  valueClass: { type: String, default: '' },
})
</script>

<template>
  <div class="flex items-center justify-between gap-3 rounded-md bg-white/5 px-2 py-1.5">
    <span class="text-slate-400">{{ label }}</span>
    <span :class="['text-right font-semibold text-cyan-300', valueClass]">{{ value }}</span>
  </div>
</template>