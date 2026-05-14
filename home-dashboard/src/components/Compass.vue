<script setup>
import { computed } from 'vue'

const props = defineProps({
  yaw: [Number, String],
})

const angle = computed(() => Number(props.yaw) || 0)
</script>

<template>
  <div class="flex flex-col items-center justify-center py-2">
    <div class="relative h-28 w-28 rounded-full border border-cyan-400/40 bg-black/30">
      <div class="absolute left-1/2 top-1 text-[0.55rem] text-slate-400">N</div>
      <div class="absolute bottom-1 left-1/2 text-[0.55rem] text-slate-400">S</div>
      <div class="absolute left-1 top-1/2 text-[0.55rem] text-slate-400">W</div>
      <div class="absolute right-1 top-1/2 text-[0.55rem] text-slate-400">E</div>

      <div
        class="absolute inset-0 transition-transform"
        :style="{ transform: `rotate(${angle}deg)` }"
      >
        <div class="absolute left-1/2 top-3 h-10 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
      </div>

      <div class="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300" />
    </div>

    <div class="mt-2 text-xs font-bold text-cyan-300">{{ angle.toFixed(1) }}°</div>
  </div>
</template>