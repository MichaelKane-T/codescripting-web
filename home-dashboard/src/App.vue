<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import ActionButton from './components/ActionButton.vue'
import PanelCard from './components/PanelCard.vue'
import TelemetryRow from './components/TelemetryRow.vue'
import SensorPill from './components/SensorPill.vue'
import Bar from './components/Bar.vue'
import Compass from './components/Compass.vue'

const API_BASE = import.meta.env.VITE_ROVER_API || ''

const online = ref(false)
const mapTick = ref(Date.now())
const logs = ref([])
const pan = ref(90)
const tilt = ref(90)

let telemetryTimer = null
let mapTimer = null

const status = reactive({})
const esp = reactive({})
const battery = reactive({})
const gyro = reactive({})

function apiUrl(path) {
  return `${API_BASE}${path}`
}

function addLog(message, ok = true) {
  logs.value = [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      time: new Date().toLocaleTimeString(),
      message,
      ok,
    },
    ...logs.value,
  ].slice(0, 80)
}

async function safeFetchJson(url, options) {
  const response = await fetch(apiUrl(url), options)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return await response.json()
}

function replaceReactive(target, source) {
  Object.keys(target).forEach((key) => delete target[key])
  Object.assign(target, source || {})
}

async function poll() {
  try {
    const [statusData, espData, batteryData, gyroData] = await Promise.all([
      safeFetchJson('/status'),
      safeFetchJson('/esp32_status'),
      safeFetchJson('/battery'),
      safeFetchJson('/gyro'),
    ])
    online.value = true
    replaceReactive(status, statusData)
    replaceReactive(esp, espData)
    replaceReactive(battery, batteryData)
    replaceReactive(gyro, gyroData)
    if (typeof statusData.pan_angle === 'number') pan.value = statusData.pan_angle
    if (typeof statusData.tilt_angle === 'number') tilt.value = statusData.tilt_angle
  } catch {
    online.value = false
  }
}

async function cmd(command) {
  try {
    const data = await safeFetchJson(`/cmd/${command}`)
    addLog(`CMD ${command.toUpperCase()} → ${data.esp32 || 'sent'}`)
  } catch {
    addLog(`CMD ${command.toUpperCase()} failed`, false)
  }
}

async function setMode(mode) {
  try {
    await fetch(apiUrl(mode === 'AUTO' ? '/auto/start' : '/auto/stop'))
    status.mode = mode
    addLog(`Mode → ${mode}`)
  } catch {
    addLog(`Mode change failed → ${mode}`, false)
  }
}

async function updateCamera(axis, value) {
  try {
    await fetch(apiUrl(`/cam/${axis}/${value}`))
    addLog(`Camera ${axis} → ${value}°`)
  } catch {
    addLog(`${axis.toUpperCase()} update failed`, false)
  }
}

async function centerCam() {
  try {
    await fetch(apiUrl('/cam/center'))
    pan.value = 90
    tilt.value = 90
    addLog('Camera centered')
  } catch {
    addLog('Camera center failed', false)
  }
}

async function camMove(direction) {
  try {
    await fetch(apiUrl(`/cam/${direction}`))
    addLog(`Camera ${direction}`)
    await poll()
  } catch {
    addLog(`Camera ${direction} failed`, false)
  }
}

function actionName(action) {
  const map = { 0: 'FORWARD', 1: 'LEFT', 2: 'RIGHT', 3: 'BACKWARD', 4: 'STOP' }
  return map[Number(action)] ?? action ?? '—'
}

const videoSrc = computed(() => apiUrl('/video'))
const mapSrc = computed(() => apiUrl(`/map?t=${mapTick.value}`))
const pathOk = computed(() => Number(esp.path) === 1)
const battPct = computed(() => Number(battery.percent ?? esp.batt_pct ?? 0))
const battVoltage = computed(() => Number(battery.voltage ?? esp.batt ?? 0))
const battLow = computed(() => Number(battery.state ?? esp.batt_state ?? 0) >= 1 || battPct.value < 25)
const yaw = computed(() => Number(gyro.yaw ?? esp.yaw ?? 0))
const gz = computed(() => Number(gyro.gz ?? esp.gz ?? 0))
const irFront = computed(() => Number(esp.ir_front || 0))
const irLeft = computed(() => Number(esp.ir_left || 0))
const irRight = computed(() => Number(esp.ir_right || 0))
const irFrontUp = computed(() => Number(esp.ir_front_up || 0))
const scan = computed(() => status.scan || {})

onMounted(() => {
  addLog('Rover dashboard loaded')
  poll()
  telemetryTimer = window.setInterval(poll, 600)
  mapTimer = window.setInterval(() => { mapTick.value = Date.now() }, 2500)
})

onUnmounted(() => {
  window.clearInterval(telemetryTimer)
  window.clearInterval(mapTimer)
})
</script>

<template>
  <div class="min-h-screen bg-[#05070b] px-4 py-4 font-mono text-slate-200 antialiased sm:px-6">
    <header class="mx-auto mb-4 flex max-w-7xl items-center justify-between gap-3 sm:mb-6">
      <div class="flex items-center gap-2">
        <span
          class="inline-block h-2.5 w-2.5 rounded-full transition-all"
          :class="online ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]' : 'bg-rose-400'"
        />
        <h1 class="text-xs tracking-[0.25em] text-cyan-300 sm:text-sm">ROVERPI CONTROL STATION</h1>
      </div>
      <div class="hidden text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:block">
        {{ online ? 'LINK ONLINE' : 'LINK OFFLINE' }}
      </div>
    </header>

    <main class="mx-auto grid max-w-7xl grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.9fr]">
      <div class="space-y-4">
        <PanelCard title="Camera Feed">
          <div class="relative overflow-hidden rounded-lg bg-black">
            <img :src="videoSrc" alt="Rover camera feed" class="aspect-video h-auto w-full object-contain" />
            <div class="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[0.6rem] text-cyan-300">
              MODE {{ status.mode || '—' }}
            </div>
            <div class="absolute right-3 top-3 rounded bg-black/70 px-2 py-1 text-[0.6rem] text-cyan-300">
              DIST {{ esp.dist >= 0 ? `${Number(esp.dist).toFixed(1)}cm` : '—' }}
            </div>
            <div v-if="!pathOk" class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded border border-red-400/50 bg-red-950/80 px-3 py-1 text-[0.7rem] font-black tracking-[0.18em] text-red-200">
              OBSTACLE / PATH BLOCKED
            </div>
          </div>
        </PanelCard>

        <section class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PanelCard title="Drive Control">
            <div class="flex flex-wrap gap-2">
              <ActionButton :active="status.mode === 'AUTO'" @click="setMode('AUTO')">AUTO</ActionButton>
              <ActionButton :active="status.mode === 'MANUAL'" @click="setMode('MANUAL')">MANUAL</ActionButton>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2 text-[0.65rem] font-extrabold tracking-[0.14em]">
              <div />
              <ActionButton @click="cmd('forward')">▲ FWD</ActionButton>
              <div />
              <ActionButton @click="cmd('left')">◀ LEFT</ActionButton>
              <ActionButton :danger="true" @click="cmd('stop')">■ STOP</ActionButton>
              <ActionButton @click="cmd('right')">RIGHT ▶</ActionButton>
              <div />
              <ActionButton @click="cmd('backward')">▼ BACK</ActionButton>
              <div />
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <ActionButton @click="cmd('scan')">SCAN</ActionButton>
              <ActionButton @click="cmd('fault_clear')">FAULT CLEAR</ActionButton>
            </div>
          </PanelCard>

          <PanelCard title="Gimbal">
            <div class="mb-1 flex items-center justify-between text-[0.65rem] text-slate-500">
              <span>Pan</span><span class="text-slate-300">{{ pan }}°</span>
            </div>
            <input type="range" min="0" max="180" v-model.number="pan"
              @mouseup="updateCamera('pan', pan)" @touchend="updateCamera('pan', pan)" class="w-full" />
            <div class="mb-1 mt-3 flex items-center justify-between text-[0.65rem] text-slate-500">
              <span>Tilt</span><span class="text-slate-300">{{ tilt }}°</span>
            </div>
            <input type="range" min="15" max="145" v-model.number="tilt"
              @mouseup="updateCamera('tilt', tilt)" @touchend="updateCamera('tilt', tilt)" class="w-full" />
            <div class="mt-3 flex flex-wrap gap-2">
              <ActionButton @click="centerCam">⊙ CENTER</ActionButton>
              <ActionButton @click="camMove('left')">PAN LEFT</ActionButton>
              <ActionButton @click="camMove('right')">PAN RIGHT</ActionButton>
            </div>
          </PanelCard>
        </section>

        <PanelCard title="Occupancy Map">
          <div class="overflow-hidden rounded-lg bg-black">
            <img :src="mapSrc" alt="Occupancy map" class="h-auto w-full object-contain" style="image-rendering: pixelated" />
          </div>
        </PanelCard>
      </div>

      <div class="space-y-4">
        <PanelCard title="System Telemetry">
          <div class="space-y-1.5 text-[0.7rem] [font-variant-numeric:tabular-nums_lining-nums]">
            <TelemetryRow label="Path" :value="pathOk ? 'CLEAR' : 'BLOCKED'" :valueClass="pathOk ? 'text-emerald-400' : 'text-red-400'" />
            <TelemetryRow label="Distance" :value="esp.dist >= 0 ? `${Number(esp.dist).toFixed(1)}cm` : 'OPEN / TIMEOUT'" />
            <TelemetryRow label="Mode" :value="status.mode || '—'" />
            <TelemetryRow label="System Ready" :value="status.system_ready ? 'YES' : 'NO'" />
            <TelemetryRow label="Direction" :value="actionName(esp.dir)" />
            <TelemetryRow label="Fault" :value="esp.fault ? 'YES' : 'NO'" :valueClass="esp.fault ? 'text-red-400' : 'text-emerald-400'" />
          </div>
        </PanelCard>

        <PanelCard title="Battery">
          <div class="space-y-3">
            <Bar label="Battery" :value="battPct" :danger="battLow" />
            <TelemetryRow label="Voltage" :value="battVoltage ? `${battVoltage.toFixed(2)}V` : '—'" :valueClass="battLow ? 'text-rose-300' : 'text-cyan-300'" />
            <TelemetryRow label="State" :value="battery.state_label || (battLow ? 'LOW' : 'OK')" :valueClass="battLow ? 'text-rose-300' : 'text-emerald-400'" />
          </div>
        </PanelCard>

        <PanelCard title="IMU / Gyro">
          <Compass :yaw="yaw" />
          <div class="space-y-1.5 text-[0.7rem]">
            <TelemetryRow label="Yaw" :value="`${yaw.toFixed(2)}°`" />
            <TelemetryRow label="GZ" :value="`${gz.toFixed(2)} dps`" />
          </div>
        </PanelCard>

        <PanelCard title="IR Sensors">
          <div class="grid grid-cols-2 gap-2">
            <SensorPill label="FRONT" :active="irFront" />
            <SensorPill label="FRONT-UP" :active="irFrontUp" />
            <SensorPill label="LEFT" :active="irLeft" />
            <SensorPill label="RIGHT" :active="irRight" />
          </div>
        </PanelCard>

        <PanelCard title="Learning / Agent">
          <div class="space-y-1.5 text-[0.7rem]">
            <TelemetryRow label="Agent Steps" :value="status.agent_steps ?? '—'" />
            <TelemetryRow label="Replay Buffer" :value="status.buffer_size ?? '—'" />
            <TelemetryRow label="Training" :value="status.training ? 'YES' : 'NO'" />
            <TelemetryRow label="Epsilon" :value="status.epsilon ?? '—'" />
            <TelemetryRow label="Exploration" :value="`${status.exploration ?? 0}%`" />
          </div>
        </PanelCard>

        <PanelCard title="Scan Readings">
          <div class="grid grid-cols-3 gap-2 text-center text-[0.65rem]">
            <div class="rounded-lg bg-white/5 p-2">
              <div class="text-slate-500">RIGHT 30°</div>
              <div class="text-cyan-300">{{ scan[30] ?? '—' }}cm</div>
            </div>
            <div class="rounded-lg bg-white/5 p-2">
              <div class="text-slate-500">FRONT 90°</div>
              <div class="text-cyan-300">{{ scan[90] ?? '—' }}cm</div>
            </div>
            <div class="rounded-lg bg-white/5 p-2">
              <div class="text-slate-500">LEFT 150°</div>
              <div class="text-cyan-300">{{ scan[150] ?? '—' }}cm</div>
            </div>
          </div>
        </PanelCard>

        <PanelCard title="ESP32 Raw">
          <div class="max-h-24 overflow-y-auto rounded-lg bg-black/40 p-2 text-[0.6rem] text-cyan-300">
            {{ esp.raw || status.esp32_msg || '—' }}
          </div>
        </PanelCard>

        <PanelCard title="Event Log">
          <div class="h-44 space-y-0.5 overflow-y-auto rounded-lg bg-black/40 p-2 text-[0.65rem]">
            <div v-for="entry in logs" :key="entry.id" class="flex gap-2 border-b border-slate-400/20 py-[2px] text-slate-400">
              <span :class="entry.ok ? 'text-emerald-400' : 'text-red-400'">{{ entry.time }}</span>
              <span>{{ entry.message }}</span>
            </div>
          </div>
        </PanelCard>
      </div>
    </main>
  </div>
</template>
