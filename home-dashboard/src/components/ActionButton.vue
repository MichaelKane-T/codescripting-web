<script setup>
defineProps({
  active: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
})
</script>

<template>
  <button
    class="rounded-lg border px-3 py-2 text-[0.65rem] font-extrabold tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
    :class="
      danger
        ? 'border-rose-400/60 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20'
        : active
          ? 'border-sky-300/60 bg-sky-400/30 text-sky-100'
          : 'border-sky-400/40 bg-sky-400/10 text-sky-300 hover:bg-sky-400/20'
    "
  >
    <slot />
  </button>
</template>