<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  value: [Number, String],
  suffix: { type: String, default: '%' },
  danger: Boolean,
})

const pct = computed(() => Math.max(0, Math.min(100, Number(props.value) || 0)))
</script>

<template>
  <div>
    <div class="mb-1 flex justify-between text-[0.65rem] text-slate-400">
      <span>{{ label }}</span>
      <span :class="danger ? 'text-rose-300' : 'text-cyan-300'">
        {{ Number(value || 0).toFixed(1) }}{{ suffix }}
      </span>
    </div>
    <div class="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        class="h-full rounded-full"
        :class="danger ? 'bg-rose-400' : 'bg-cyan-400'"
        :style="{ width: pct + '%' }"
      />
    </div>
  </div>
</template>