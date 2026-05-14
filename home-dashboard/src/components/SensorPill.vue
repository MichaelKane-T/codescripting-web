<script setup>
defineProps({
  label: String,
  active: [Boolean, Number],
})
</script>

<template>
  <div
    class="rounded-lg border px-2 py-3 text-center text-[0.65rem] font-black tracking-[0.14em]"
    :class="
      active
        ? 'border-red-400/60 bg-red-500/25 text-red-200 shadow-[0_0_14px_rgba(248,113,113,0.25)]'
        : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
    "
  >
    <div>{{ label }}</div>
    <div class="mt-1 text-[0.55rem] opacity-70">{{ active ? 'BLOCKED' : 'CLEAR' }}</div>
  </div>
</template>