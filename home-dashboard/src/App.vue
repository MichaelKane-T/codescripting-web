<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from "vue";

const clock = ref("");
const mode = ref("LOCAL");
const armed = ref(false);
const sending = ref(false);
const lastCmd = ref("SYSTEM:BOOT");
const logBox = ref(null);
const canvas = ref(null);
let tick = null;
let raf = null;
let frame = 0;

const telemetry = reactive({
  distance: 82,
  heading: 214,
  speed: 0,
  battery: 78,
  link: 96,
  cpu: 22,
  ram: 41,
  disk: 18,
  state: "IDLE",
  gps: "SIM-LOCAL",
});

const gimbal = reactive({
  pan: 90,
  tilt: 90,
});

const logs = ref([
  { t: "00:00:01", type: "SYS", msg: "Command center initialized", ok: true },
  { t: "00:00:02", type: "NET", msg: "Cloudflare Access verified", ok: true },
  { t: "00:00:03", type: "LINK", msg: "ESP32 telemetry bridge pending", ok: true },
]);

const commandGrid = [
  ["SCAN", "HOLD", "RETURN"],
  ["LEFT", "STOP", "RIGHT"],
  ["BACK", "FWD", "LIGHTS"],
];

const missionItems = computed(() => [
  { label: "OPS MODE", value: mode.value },
  { label: "FSM STATE", value: telemetry.state },
  { label: "GPS", value: telemetry.gps },
  { label: "LINK", value: `${telemetry.link}%` },
]);

function now() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

function addLog(type, msg, ok = true) {
  logs.value = [...logs.value.slice(-80), { t: now(), type, msg, ok }];
  nextTick(() => {
    if (logBox.value) logBox.value.scrollTop = logBox.value.scrollHeight;
  });
}

function sendCommand(cmd) {
  if (sending.value) return;
  sending.value = true;
  lastCmd.value = cmd;

  const ok = Math.random() > 0.06;
  telemetry.state = cmd === "STOP" ? "HOLD" : cmd;
  if (cmd === "FWD") telemetry.speed = 180;
  if (cmd === "BACK") telemetry.speed = 120;
  if (cmd === "STOP" || cmd === "HOLD") telemetry.speed = 0;
  if (cmd === "SCAN") telemetry.state = "SCAN";

  addLog("CMD", `${cmd} dispatched`, ok);

  setTimeout(() => {
    sending.value = false;
  }, 180);
}

function toggleArm() {
  armed.value = !armed.value;
  addLog("SAFE", armed.value ? "System armed" : "System disarmed", true);
}

function updateTelemetry() {
  telemetry.distance = Math.max(9, Math.min(220, telemetry.distance + (Math.random() - 0.5) * 10));
  telemetry.heading = (telemetry.heading + (Math.random() - 0.5) * 5 + 360) % 360;
  telemetry.battery = Math.max(18, telemetry.battery - Math.random() * 0.04);
  telemetry.link = Math.max(78, Math.min(100, telemetry.link + (Math.random() - 0.5) * 2));
  telemetry.cpu = Math.max(5, Math.min(88, telemetry.cpu + (Math.random() - 0.5) * 7));
  telemetry.ram = Math.max(20, Math.min(86, telemetry.ram + (Math.random() - 0.5) * 3));
}

function pctColor(v) {
  if (v > 85) return "text-red-400";
  if (v > 65) return "text-amber-300";
  return "text-cyan-300";
}

function barColor(v) {
  if (v > 85) return "bg-red-500";
  if (v > 65) return "bg-amber-300";
  return "bg-cyan-400";
}

function drawCamera() {
  const c = canvas.value;
  if (!c) return;

  const ctx = c.getContext("2d");
  frame++;

  ctx.fillStyle = "#02050a";
  ctx.fillRect(0, 0, 640, 360);

  ctx.strokeStyle = "rgba(0,229,255,.04)";
  ctx.lineWidth = 1;

  for (let x = 0; x < 640; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 360);
    ctx.stroke();
  }

  for (let y = 0; y < 360; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(640, y);
    ctx.stroke();
  }

  const horizon = 190 + Math.sin(frame * 0.01) * 4;
  ctx.fillStyle = "#07131a";
  ctx.fillRect(0, horizon, 640, 360 - horizon);

  ctx.strokeStyle = "rgba(255,184,0,.08)";
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(320, horizon);
    ctx.lineTo(i * 64, 360);
    ctx.stroke();
  }

  const d = telemetry.distance;
  const boxW = Math.max(28, Math.min(210, 7000 / d));
  const boxH = boxW * 0.58;
  const x = 320 - boxW / 2 + Math.sin(frame * 0.02) * 9;
  const y = horizon - boxH + 20;

  ctx.fillStyle = "rgba(255,184,0,.08)";
  ctx.fillRect(x, y, boxW, boxH);
  ctx.strokeStyle = d < 35 ? "#ff3b3b" : "#ffb800";
  ctx.lineWidth = d < 35 ? 3 : 1.5;
  ctx.strokeRect(x, y, boxW, boxH);

  ctx.setLineDash([6, 8]);
  ctx.strokeStyle = "rgba(0,229,255,.55)";
  ctx.beginPath();
  ctx.moveTo(320, 70);
  ctx.lineTo(320, 290);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(170, 180);
  ctx.lineTo(470, 180);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(0,229,255,.28)";
  ctx.beginPath();
  ctx.arc(320, 180, 52, 0, Math.PI * 2);
  ctx.stroke();

  const scanY = ((frame * 2) % 410) - 30;
  const grad = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.5, "rgba(0,229,255,.08)");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, scanY - 18, 640, 36);

  ctx.fillStyle = "rgba(0,229,255,.75)";
  ctx.font = "12px monospace";
  ctx.fillText(`TARGET DIST ${Math.round(telemetry.distance)}CM`, 18, 334);
  ctx.fillText(`HDG ${Math.round(telemetry.heading)}°`, 530, 24);
  ctx.fillText(`FRAME ${frame}`, 18, 24);

  raf = requestAnimationFrame(drawCamera);
}

function keyHandler(e) {
  const k = e.key.toLowerCase();
  const map = {
    w: "FWD",
    s: "BACK",
    a: "LEFT",
    d: "RIGHT",
    " ": "STOP",
  };

  if (map[k]) {
    e.preventDefault();
    sendCommand(map[k]);
  }

  if (e.key === "ArrowLeft") gimbal.pan = Math.max(0, gimbal.pan - 5);
  if (e.key === "ArrowRight") gimbal.pan = Math.min(180, gimbal.pan + 5);
  if (e.key === "ArrowUp") gimbal.tilt = Math.min(145, gimbal.tilt + 5);
  if (e.key === "ArrowDown") gimbal.tilt = Math.max(15, gimbal.tilt - 5);
}

onMounted(() => {
  clock.value = now();
  tick = setInterval(() => {
    clock.value = now();
    updateTelemetry();
  }, 1000);

  window.addEventListener("keydown", keyHandler);
  drawCamera();
});

onUnmounted(() => {
  clearInterval(tick);
  cancelAnimationFrame(raf);
  window.removeEventListener("keydown", keyHandler);
});
</script>

<template>
  <main class="min-h-screen bg-[#05070b] p-4 font-mono text-slate-300">
    <div class="pointer-events-none fixed inset-0 opacity-50 [background-image:linear-gradient(rgba(0,229,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.025)_1px,transparent_1px)] [background-size:34px_34px]"></div>

    <div class="relative z-10 mx-auto max-w-[1400px] space-y-4">
      <header class="grid gap-3 border-b border-cyan-400/10 pb-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div>
          <p class="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">Secure Private Console</p>
          <h1 class="mt-1 text-2xl font-black tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,.25)]">
            ROVERPI OPS CENTER
          </h1>
        </div>

        <div class="justify-self-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 text-center">
          <p class="text-[10px] uppercase tracking-[0.25em] text-slate-500">Mission Clock</p>
          <p class="text-lg font-black text-slate-100">{{ clock }}</p>
        </div>

        <div class="flex flex-wrap justify-start gap-2 lg:justify-end">
          <button
            @click="toggleArm"
            class="rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition"
            :class="armed ? 'border-red-400/50 bg-red-500/10 text-red-300' : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'"
          >
            {{ armed ? "Armed" : "Safe" }}
          </button>

          <button
            @click="mode = mode === 'LOCAL' ? 'REMOTE' : 'LOCAL'"
            class="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300"
          >
            {{ mode }}
          </button>
        </div>
      </header>

      <section class="grid gap-4 xl:grid-cols-[280px_1fr_320px]">
        <aside class="space-y-4">
          <div class="panel">
            <div class="panel-title">Mission State</div>
            <div class="mt-4 space-y-3">
              <div v-for="item in missionItems" :key="item.label" class="flex items-center justify-between rounded-xl bg-white/[0.025] px-3 py-2">
                <span class="text-[10px] uppercase tracking-[0.2em] text-slate-600">{{ item.label }}</span>
                <span class="text-xs font-bold text-cyan-300">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">System Health</div>
            <div class="mt-4 space-y-4">
              <div v-for="s in [
                { label: 'CPU', val: telemetry.cpu },
                { label: 'RAM', val: telemetry.ram },
                { label: 'DISK', val: telemetry.disk },
                { label: 'LINK', val: telemetry.link },
                { label: 'BATT', val: telemetry.battery },
              ]" :key="s.label">
                <div class="mb-1 flex justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span class="text-slate-600">{{ s.label }}</span>
                  <span :class="pctColor(s.val)">{{ Math.round(s.val) }}%</span>
                </div>
                <div class="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div class="h-full rounded-full transition-all duration-500" :class="barColor(s.val)" :style="{ width: s.val + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Quick Links</div>
            <div class="mt-4 grid gap-2">
              <a href="https://codescripting.com" class="link-btn">Public Site</a>
              <a href="https://home.codescripting.com" class="link-btn">Home Console</a>
              <a href="/api/health" class="link-btn">API Health</a>
            </div>
          </div>
        </aside>

        <section class="space-y-4">
          <div class="overflow-hidden rounded-2xl border border-cyan-400/10 bg-black shadow-2xl shadow-cyan-500/5">
            <div class="flex items-center justify-between border-b border-cyan-400/10 bg-[#081018] px-4 py-3">
              <div>
                <p class="text-[10px] uppercase tracking-[0.25em] text-cyan-400/60">Primary Optical Feed</p>
                <p class="text-xs text-slate-500">SIM CAM · 640×360 · target tracking overlay</p>
              </div>
              <div class="flex items-center gap-2 text-xs text-emerald-300">
                <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                LIVE
              </div>
            </div>
            <canvas ref="canvas" width="640" height="360" class="block w-full [image-rendering:pixelated]"></canvas>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="metric-card">
              <span>Distance</span>
              <strong>{{ Math.round(telemetry.distance) }}<em>cm</em></strong>
            </div>
            <div class="metric-card">
              <span>Heading</span>
              <strong>{{ Math.round(telemetry.heading) }}<em>°</em></strong>
            </div>
            <div class="metric-card">
              <span>Speed</span>
              <strong>{{ telemetry.speed }}<em>pwm</em></strong>
            </div>
          </div>

          <div class="panel">
            <div class="mb-3 flex items-center justify-between">
              <div class="panel-title">Event Stream</div>
              <div class="text-[10px] uppercase tracking-[0.2em] text-slate-600">last command: {{ lastCmd }}</div>
            </div>

            <div ref="logBox" class="h-[170px] overflow-y-auto rounded-xl bg-black/30 p-3 text-[11px]">
              <div v-for="(l, idx) in logs" :key="idx" class="grid grid-cols-[72px_50px_1fr] gap-3 border-b border-white/[0.03] py-1">
                <span class="text-slate-600">{{ l.t }}</span>
                <span :class="l.ok ? 'text-emerald-300' : 'text-red-300'">{{ l.type }}</span>
                <span class="text-slate-300">{{ l.msg }}</span>
              </div>
            </div>
          </div>
        </section>

        <aside class="space-y-4">
          <div class="panel">
            <div class="panel-title">Drive Control</div>
            <div class="mt-4 grid gap-2">
              <div v-for="(row, r) in commandGrid" :key="r" class="grid grid-cols-3 gap-2">
                <button
                  v-for="cmd in row"
                  :key="cmd"
                  @click="sendCommand(cmd)"
                  class="cmd"
                  :class="cmd === 'STOP' ? 'danger' : ''"
                >
                  {{ cmd }}
                </button>
              </div>
            </div>
            <p class="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-slate-600">WASD + Space enabled</p>
          </div>

          <div class="panel">
            <div class="panel-title">Gimbal Control</div>

            <div class="mt-4 space-y-4">
              <div>
                <div class="mb-1 flex justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  <span>Pan</span>
                  <span class="text-sky-300">{{ gimbal.pan }}°</span>
                </div>
                <input v-model="gimbal.pan" type="range" min="0" max="180" class="w-full accent-sky-400" />
              </div>

              <div>
                <div class="mb-1 flex justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  <span>Tilt</span>
                  <span class="text-amber-300">{{ gimbal.tilt }}°</span>
                </div>
                <input v-model="gimbal.tilt" type="range" min="15" max="145" class="w-full accent-amber-300" />
              </div>

              <button @click="gimbal.pan = 90; gimbal.tilt = 90; addLog('GMBL', 'Gimbal centered')" class="w-full rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Center Gimbal
              </button>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Deployment</div>
            <div class="mt-4 space-y-2 text-xs text-slate-500">
              <p>Origin: Ubuntu Server</p>
              <p>Proxy: Nginx</p>
              <p>Tunnel: Cloudflare</p>
              <p>Private: Access Protected</p>
              <p>Admin: Tailscale SSH</p>
            </div>
          </div>
        </aside>
      </section>

      <footer class="border-t border-cyan-400/10 py-4 text-center text-[10px] uppercase tracking-[0.25em] text-slate-700">
        RoverPi Tactical Interface · Mock Telemetry Preview · {{ new Date().getFullYear() }}
      </footer>
    </div>
  </main>
</template>

<style>
.panel {
  border: 1px solid rgba(34, 211, 238, 0.1);
  background: rgba(8, 16, 24, 0.84);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 40px rgba(34, 211, 238, 0.035);
}

.panel-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(103, 232, 249, 0.7);
}

.metric-card {
  border: 1px solid rgba(34, 211, 238, 0.1);
  background: rgba(8, 16, 24, 0.84);
  border-radius: 1rem;
  padding: 1rem;
}

.metric-card span {
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgb(71, 85, 105);
}

.metric-card strong {
  display: block;
  margin-top: 0.35rem;
  font-size: 2rem;
  line-height: 1;
  color: rgb(165, 243, 252);
}

.metric-card em {
  margin-left: 0.25rem;
  font-size: 0.75rem;
  font-style: normal;
  color: rgb(71, 85, 105);
}

.cmd {
  border: 1px solid rgba(56, 189, 248, 0.28);
  background: rgba(56, 189, 248, 0.055);
  border-radius: 0.75rem;
  padding: 0.85rem 0.3rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: rgb(125, 211, 252);
  transition: all 0.12s ease;
}

.cmd:hover {
  transform: translateY(-1px);
  border-color: rgba(56, 189, 248, 0.65);
  background: rgba(56, 189, 248, 0.16);
}

.cmd.danger {
  border-color: rgba(248, 113, 113, 0.34);
  background: rgba(248, 113, 113, 0.08);
  color: rgb(252, 165, 165);
}

.link-btn {
  border: 1px solid rgba(148, 163, 184, 0.12);
  background: rgba(255, 255, 255, 0.025);
  border-radius: 0.75rem;
  padding: 0.75rem;
  font-size: 0.75rem;
  color: rgb(148, 163, 184);
  transition: all 0.12s ease;
}

.link-btn:hover {
  border-color: rgba(34, 211, 238, 0.35);
  color: rgb(103, 232, 249);
}
</style>
