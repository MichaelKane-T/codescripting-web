<script setup>
import { ref, onMounted } from "vue";

const apiStatus = ref("checking");
const apiTime = ref("");
const cpuUsage = ref(0);
const ramUsage = ref(0);
const diskUsage = ref(0);
const uptime = ref("—");

const projects = [
  {
    tag: "Robotics / Embedded",
    title: "RoverPi",
    desc: "ESP32 + Raspberry Pi Zero robotic platform with motor control, telemetry, sensors, and future autonomy features.",
    chips: ["ESP32", "Pi Zero", "UART", "PWM", "Sensors"],
  },
  {
    tag: "Robotics / Control",
    title: "RoverQ",
    desc: "Arduino-based rover platform focused on low-level motor control, remote operation, and modular expansion.",
    chips: ["Arduino", "RF", "Motors", "FSM"],
  },
  {
    tag: "Wireless Systems",
    title: "Nano Remote Controller",
    desc: "Arduino Nano handheld controller with display and RF link for controlling remote rover platforms.",
    chips: ["Arduino Nano", "NRF24", "Display", "Joystick"],
  },
  {
    tag: "Gaming / Embedded",
    title: "ESP32 Handheld Console",
    desc: "Portable game system built on ESP32 with wireless antenna mode for remote rover operation.",
    chips: ["ESP32", "Display", "Battery", "Wireless"],
  },
  {
    tag: "Linux / IoT",
    title: "Smart Doorbell",
    desc: "Raspberry Pi Zero + HAT smart doorbell with camera, notifications, and remote access potential.",
    chips: ["Pi Zero", "Linux", "Camera", "GPIO"],
  },
  {
    tag: "DSP / Systems",
    title: "Laser Tag Platform",
    desc: "Custom laser tag hardware involving signal processing, embedded control, and interactive systems.",
    chips: ["DSP", "MCU", "Sensors", "Embedded C"],
  },
  {
    tag: "FPGA / RTL",
    title: "RTL + FPGA Systems",
    desc: "UART receivers, VGA pipelines, FSM designs, memory-mapped graphics, and Basys3 FPGA projects.",
    chips: ["SystemVerilog", "Vivado", "UART", "VGA"],
  },
  {
    tag: "Infrastructure",
    title: "Codescripting Home Lab",
    desc: "Cloudflare Tunnel, OPNsense, Tailscale, Nginx, Express, and secure self-hosted web infrastructure.",
    chips: ["Linux", "Cloudflare", "Nginx", "Networking"],
  },
];

onMounted(async () => {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    apiStatus.value = "online";
    apiTime.value = new Date(data.time).toLocaleString();
  } catch {
    apiStatus.value = "offline";
  }

  try {
    const res = await fetch("/api/stats");
    const data = await res.json();
    cpuUsage.value = data.cpu ?? 0;
    ramUsage.value = data.ram ?? 0;
    diskUsage.value = data.disk ?? 0;
    uptime.value = data.uptime ?? "—";
  } catch {
    cpuUsage.value = 0;
    ramUsage.value = 0;
    diskUsage.value = 0;
    uptime.value = "stats endpoint offline";
  }
});

const statColor = (val) => {
  if (val > 85) return "text-red-400";
  if (val > 65) return "text-amber-400";
  return "text-emerald-400";
};

const barColor = (val) => {
  if (val > 85) return "bg-red-500";
  if (val > 65) return "bg-amber-400";
  return "bg-cyan-400";
};
</script>

<template>
  <main class="min-h-screen overflow-x-hidden bg-[#080c10] font-sans text-slate-200 antialiased">
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div class="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
    </div>

    <nav class="sticky top-0 z-50 border-b border-white/[0.05] bg-[#080c10]/80 backdrop-blur-xl">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <span class="font-mono text-xs tracking-[0.12em] text-cyan-400">codescripting.com</span>

        <div class="hidden items-center gap-7 sm:flex">
          <a href="#projects" class="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-200">Projects</a>
          <a href="#" class="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-200">Resume</a>
          <a href="#" class="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-200">Contact</a>
        </div>

        <div class="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
          </span>
          lab live
        </div>
      </div>
    </nav>

    <section class="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div class="mb-8 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-cyan-300">
        <span class="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
        Codescripting Home Lab · Live Infrastructure
      </div>

      <div class="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div class="animate-fade-up">
          <h1 class="text-[clamp(2.6rem,5.5vw,4.4rem)] font-extrabold leading-[1.04] tracking-tight">
            <span class="text-slate-100">Building systems from</span><br />
            <span class="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              silicon to cloud.
            </span>
          </h1>

          <p class="mt-6 max-w-2xl text-[1.05rem] leading-8 text-slate-400">
            Electrical & Computer Engineer building robotics, embedded systems,
            FPGA designs, Linux infrastructure, and secure cloud-connected tools.
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="t in ['SystemVerilog','ESP32','FreeRTOS','Raspberry Pi','Basys3','DSP','Nginx','Cloudflare','Vue']"
              :key="t"
              class="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-widest text-slate-500"
            >
              {{ t }}
            </span>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              class="rounded-xl bg-cyan-400 px-7 py-3 text-sm font-bold tracking-wide text-[#020d12] shadow-[0_0_30px_rgba(34,211,238,0.25)] transition hover:-translate-y-px hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
            >
              View Projects
            </a>
            <a
              href="https://home.codescripting.com"
              class="rounded-xl border border-white/10 px-7 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
            >
              Private Dashboard →
            </a>
          </div>
        </div>

        <div class="animate-fade-up overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1520] shadow-2xl animation-delay-150">
          <div class="flex items-center justify-between border-b border-white/[0.05] px-5 py-3.5">
            <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-600">Live Server</span>

            <div class="flex items-center gap-2 font-mono text-[11px]">
              <template v-if="apiStatus === 'online'">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50"></span>
                  <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                </span>
                <span class="text-emerald-400">Online</span>
              </template>
              <template v-else-if="apiStatus === 'offline'">
                <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span class="text-red-400">Offline</span>
              </template>
              <template v-else>
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400"></span>
                <span class="text-amber-400">Checking</span>
              </template>
            </div>
          </div>

          <div class="space-y-5 p-5">
            <div>
              <p class="font-mono text-xs text-cyan-400">GET /api/health</p>
              <p class="mt-0.5 font-mono text-[10px] text-slate-600">{{ apiTime || "—" }}</p>
            </div>

            <div class="space-y-3">
              <div
                v-for="({ label, value }) in [
                  { label: 'CPU', value: cpuUsage },
                  { label: 'RAM', value: ramUsage },
                  { label: 'Disk', value: diskUsage },
                ]"
                :key="label"
              >
                <div class="mb-1.5 flex justify-between">
                  <span class="font-mono text-[10px] uppercase tracking-widest text-slate-600">{{ label }}</span>
                  <span class="font-mono text-[11px]" :class="statColor(value)">{{ value }}%</span>
                </div>
                <div class="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :class="barColor(value)"
                    :style="{ width: value + '%' }"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
              <span class="font-mono text-[10px] uppercase tracking-widest text-slate-600">Uptime</span>
              <span class="font-mono text-xs text-slate-300">{{ uptime }}</span>
            </div>

            <div class="grid gap-2">
              <div
                v-for="({ label, value }) in [
                  { label: 'Frontend', value: 'Vue + Vite + Tailwind' },
                  { label: 'Backend', value: 'Express / Nginx' },
                  { label: 'Tunnel', value: 'Cloudflare + Tailscale' },
                  { label: 'Storage', value: 'Ubuntu + /data SSD' },
                ]"
                :key="label"
                class="flex items-center justify-between rounded-xl border border-white/[0.04] bg-[#080c10] px-3.5 py-2.5"
              >
                <span class="font-mono text-[10px] uppercase tracking-widest text-slate-600">{{ label }}</span>
                <span class="text-right font-mono text-[11px] text-slate-400">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 grid overflow-hidden rounded-2xl border border-white/[0.05] md:grid-cols-3">
        <div
          v-for="({ num, suffix, label }) in [
            { num: projects.length, suffix: '+', label: 'Featured Projects' },
            { num: '12', suffix: 'k+', label: 'Lines RTL / Code' },
            { num: uptime, suffix: '', label: 'Current Server Uptime' },
          ]"
          :key="label"
          class="border-b border-white/[0.05] bg-[#080c10] px-6 py-7 md:border-b-0 md:border-r last:border-r-0"
        >
          <p class="text-3xl font-extrabold tracking-tight text-slate-100">
            {{ num }}<span class="text-xl text-cyan-400">{{ suffix }}</span>
          </p>
          <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-600">{{ label }}</p>
        </div>
      </div>
    </section>

    <section id="projects" class="relative z-10 mx-auto max-w-6xl px-6 pb-20">
      <div class="mb-8 flex items-center gap-4">
        <span class="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-400">Projects</span>
        <div class="h-px flex-1 bg-white/[0.05]"></div>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="p in projects"
          :key="p.title"
          class="group relative min-h-[290px] rounded-2xl border border-white/[0.06] bg-[#0b1118] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#0d1520] hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          <div class="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

          <p class="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-400">{{ p.tag }}</p>
          <h2 class="text-xl font-extrabold tracking-tight text-slate-100">{{ p.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-slate-500">{{ p.desc }}</p>

          <div class="mt-5 flex flex-wrap gap-1.5">
            <span
              v-for="chip in p.chips"
              :key="chip"
              class="rounded-lg border border-white/[0.06] px-2 py-0.5 font-mono text-[9px] tracking-widest text-slate-600"
            >
              {{ chip }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <footer class="relative z-10 border-t border-white/[0.05]">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p class="font-mono text-[11px] text-slate-700">© 2026 codescripting.com — Michael Kane</p>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-slate-600 transition-colors hover:text-cyan-400">GitHub</a>
          <a href="#" class="text-xs text-slate-600 transition-colors hover:text-cyan-400">LinkedIn</a>
          <a href="#" class="text-xs text-slate-600 transition-colors hover:text-cyan-400">Resume</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap");

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.55s ease both;
}

.animation-delay-150 {
  animation-delay: 150ms;
}

body,
.font-sans {
  font-family: "Syne", sans-serif;
}

.font-mono {
  font-family: "Space Mono", monospace;
}
</style>
