<script setup>
import { ref, onMounted } from "vue";

const apiStatus = ref("checking");
const apiTime = ref("");
const cpuUsage = ref(0);
const ramUsage = ref(0);
const diskUsage = ref(0);
const uptime = ref("—");
const rebootLoading = ref(false);
const rebootMsg = ref("");

onMounted(async () => {
  // Health check
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    apiStatus.value = "online";
    apiTime.value = new Date(data.time).toLocaleString();
  } catch {
    apiStatus.value = "offline";
  }

  // Fetch system stats (replace with your real endpoint)
  try {
    const res = await fetch("/api/stats");
    const data = await res.json();
    cpuUsage.value = data.cpu ?? 0;
    ramUsage.value = data.ram ?? 0;
    diskUsage.value = data.disk ?? 0;
    uptime.value = data.uptime ?? "—";
  } catch {
    // fallback to mock values for display
    cpuUsage.value = 34;
    ramUsage.value = 61;
    diskUsage.value = 47;
    uptime.value = "14d 6h";
  }
});

async function reboot() {
  if (!confirm("Reboot the server?")) return;
  rebootLoading.value = true;
  try {
    await fetch("/api/reboot", { method: "POST" });
    rebootMsg.value = "Reboot signal sent.";
  } catch {
    rebootMsg.value = "Failed to reach API.";
  } finally {
    rebootLoading.value = false;
  }
}

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
  <main class="min-h-screen bg-[#080c10] text-slate-200 font-sans antialiased overflow-x-hidden">

    <!-- Ambient glow orbs -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
    </div>

    <!-- Nav -->
    <nav class="sticky top-0 z-50 border-b border-white/[0.05] bg-[#080c10]/80 backdrop-blur-xl">
      <div class="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <span class="font-mono text-xs tracking-[0.12em] text-cyan-400">codescripting.com</span>
        <div class="hidden sm:flex items-center gap-7">
          <a href="#projects" class="text-xs tracking-widest text-slate-500 hover:text-slate-200 transition-colors uppercase">Projects</a>
          <a href="#" class="text-xs tracking-widest text-slate-500 hover:text-slate-200 transition-colors uppercase">Resume</a>
          <a href="#" class="text-xs tracking-widest text-slate-500 hover:text-slate-200 transition-colors uppercase">Contact</a>
        </div>
        <div class="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          lab live
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16">

      <!-- Eyebrow -->
      <div class="mb-8 inline-flex items-center gap-2 rounded-sm border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-cyan-300">
        <span class="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
        Codescripting Home Lab &nbsp;·&nbsp; Live Infrastructure
      </div>

      <!-- Two-column grid — same as original, just sharper -->
      <div class="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">

        <!-- LEFT: headline + body + CTAs -->
        <div class="animate-fade-up">
          <h1 class="text-[clamp(2.6rem,5.5vw,4.2rem)] font-extrabold leading-[1.04] tracking-tight">
            <span class="text-slate-100">Building systems from</span><br />
            <span class="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              silicon to cloud.
            </span>
          </h1>

          <p class="mt-6 max-w-xl text-[1.05rem] leading-8 text-slate-400">
            Embedded systems, robotics, RTL design, Linux infrastructure, and
            full-stack tooling — all running from a self-hosted lab.
          </p>

          <!-- Tech tags -->
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="t in ['SystemVerilog','ROS2','FreeRTOS','STM32','KiCad','Basys3','LTspice','Docker','Nginx']"
              :key="t"
              class="rounded-sm border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-widest text-slate-600">
              {{ t }}
            </span>
          </div>

          <!-- CTAs -->
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="#projects"
              class="rounded-sm bg-cyan-400 px-7 py-3 text-sm font-bold tracking-wide text-[#020d12] shadow-[0_0_30px_rgba(34,211,238,0.25)] transition hover:-translate-y-px hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              View Projects
            </a>
            <a href="https://home.codescripting.com"
              class="rounded-sm border border-white/10 px-7 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-white">
              Private Dashboard →
            </a>
          </div>
        </div>

        <!-- RIGHT: Private Dashboard panel -->
        <div class="rounded-sm border border-white/[0.07] bg-[#0d1520] shadow-2xl overflow-hidden animate-fade-up animation-delay-150">

          <!-- Panel header -->
          <div class="flex items-center justify-between border-b border-white/[0.05] px-5 py-3.5">
            <span class="font-mono text-[10px] tracking-[0.12em] text-slate-600 uppercase">Private Dashboard</span>
            <!-- Status badge -->
            <div class="flex items-center gap-2 font-mono text-[11px]">
              <template v-if="apiStatus === 'online'">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                <span class="text-emerald-400">Online</span>
              </template>
              <template v-else-if="apiStatus === 'offline'">
                <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span class="text-red-400">Offline</span>
              </template>
              <template v-else>
                <span class="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span class="text-amber-400">Checking</span>
              </template>
            </div>
          </div>

          <div class="p-5 space-y-5">

            <!-- API info -->
            <div>
              <p class="font-mono text-xs text-cyan-400">GET /api/health</p>
              <p class="mt-0.5 font-mono text-[10px] text-slate-700">{{ apiTime || '—' }}</p>
            </div>

            <!-- System stats -->
            <div class="space-y-3">
              <div v-for="({ label, value }) in [
                { label: 'CPU', value: cpuUsage },
                { label: 'RAM', value: ramUsage },
                { label: 'Disk', value: diskUsage },
              ]" :key="label">
                <div class="flex justify-between mb-1.5">
                  <span class="font-mono text-[10px] tracking-widest text-slate-600 uppercase">{{ label }}</span>
                  <span class="font-mono text-[11px]" :class="statColor(value)">{{ value }}%</span>
                </div>
                <div class="h-0.5 rounded-full bg-white/[0.05] overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700"
                    :class="barColor(value)"
                    :style="{ width: value + '%' }">
                  </div>
                </div>
              </div>
            </div>

            <!-- Uptime -->
            <div class="rounded-sm border border-white/[0.04] bg-white/[0.02] px-4 py-3 flex justify-between items-center">
              <span class="font-mono text-[10px] tracking-widest text-slate-600 uppercase">Uptime</span>
              <span class="font-mono text-xs text-slate-300">{{ uptime }}</span>
            </div>

            <!-- Stack rows -->
            <div class="space-y-1.5">
              <div v-for="({ label, value }) in [
                { label: 'Frontend',  value: 'Vue + Vite + Tailwind' },
                { label: 'Backend',   value: 'Express / Nginx'       },
                { label: 'Tunnel',    value: 'Cloudflare + Tailscale'},
                { label: 'Auth',      value: 'JWT / API Keys'        },
              ]" :key="label"
                class="flex items-center justify-between rounded-sm border border-white/[0.04] bg-[#080c10] px-3.5 py-2.5">
                <span class="font-mono text-[10px] tracking-widest text-slate-600 uppercase">{{ label }}</span>
                <span class="font-mono text-[11px] text-slate-400">{{ value }}</span>
              </div>
            </div>

            <!-- Reboot button -->
            <button
              @click="reboot"
              :disabled="rebootLoading"
              class="w-full rounded-sm border border-red-500/20 bg-red-500/[0.04] py-2.5 font-mono text-[11px] tracking-widest text-red-500/70 uppercase transition hover:border-red-500/40 hover:text-red-400 disabled:opacity-40">
              {{ rebootLoading ? 'Sending...' : '⏻  Reboot Server' }}
            </button>
            <p v-if="rebootMsg" class="text-center font-mono text-[10px] text-slate-600">{{ rebootMsg }}</p>

          </div>
        </div>

      </div>

      <!-- Animated stats strip -->
      <div class="mt-16 grid grid-cols-3 divide-x divide-white/[0.05] rounded-sm border border-white/[0.05] overflow-hidden">
        <div v-for="({ num, suffix, label }) in [
          { num: '8',   suffix: '+',  label: 'Active Projects'     },
          { num: '12',  suffix: 'k',  label: 'Lines RTL / Code'    },
          { num: '692', suffix: 'h',  label: 'Uptime This Month'   },
        ]" :key="label" class="bg-[#080c10] px-6 py-7">
          <p class="text-3xl font-extrabold tracking-tight text-slate-100">
            {{ num }}<span class="text-cyan-400 text-xl">{{ suffix }}</span>
          </p>
          <p class="mt-1 font-mono text-[10px] tracking-[0.1em] text-slate-600 uppercase">{{ label }}</p>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="relative z-10 mx-auto max-w-6xl px-6 pb-20">
      <div class="mb-8 flex items-center gap-4">
        <span class="font-mono text-[10px] tracking-[0.15em] text-cyan-400 uppercase">Projects</span>
        <div class="flex-1 h-px bg-white/[0.05]"></div>
      </div>

      <div class="grid gap-px bg-white/[0.05] rounded-sm overflow-hidden md:grid-cols-3">
        <div v-for="p in projects" :key="p.title"
          class="group relative bg-[#080c10] p-7 transition-colors hover:bg-[#0d1520] overflow-hidden">
          <!-- hover top accent line -->
          <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          <p class="mb-4 font-mono text-[10px] tracking-[0.12em] text-cyan-400 uppercase">{{ p.tag }}</p>
          <h2 class="text-xl font-extrabold tracking-tight text-slate-100">{{ p.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-slate-500">{{ p.desc }}</p>
          <div class="mt-5 flex flex-wrap gap-1.5">
            <span v-for="chip in p.chips" :key="chip"
              class="rounded-sm border border-white/[0.06] px-2 py-0.5 font-mono text-[9px] tracking-widest text-slate-700">
              {{ chip }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-white/[0.05]">
      <div class="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="font-mono text-[11px] text-slate-700">© 2025 codescripting.com — Michael Kane</p>
        <div class="flex gap-6">
          <a v-for="l in ['GitHub','LinkedIn','Resume']" :key="l" href="#"
            class="text-xs text-slate-600 hover:text-cyan-400 transition-colors">{{ l }}</a>
        </div>
      </div>
    </footer>

  </main>
</template>

<script>
// Data defined here to keep setup() clean — or move to setup() with const
export default {
  data() {
    return {
      projects: [
        {
          tag: "Robotics / Embedded",
          title: "RoverQ",
          desc: "Tri-processor autonomous rover: Qualcomm QRB2210 (ROS2/nav), STM32 safety supervisor, Terasic FPGA for hardware abstraction. CAN + SPI inter-processor comms.",
          chips: ["ROS2","FreeRTOS","CAN","SPI","KiCad","LiPo"],
        },
        {
          tag: "FPGA / RTL Design",
          title: "RTL & FPGA",
          desc: "SystemVerilog pipelines, UART/VGA controllers, AES parallel codebreaker, and a VGA platformer — all targeting the Basys 3 in Vivado.",
          chips: ["SystemVerilog","Basys3","VGA","UART","AES","Vivado"],
        },
        {
          tag: "Infrastructure",
          title: "Home Lab",
          desc: "OPNsense firewall, Cloudflare Tunnel, Tailscale mesh, Nginx reverse proxy, Docker deployments — running this very site.",
          chips: ["OPNsense","Docker","Nginx","Cloudflare","Tailscale"],
        },
      ],
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

/* Tailwind handles everything; these are just the animation utilities not in base Tailwind */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.animate-fade-up { animation: fade-up 0.55s ease both; }
.animation-delay-150 { animation-delay: 150ms; }

/* Font assignment */
body, .font-sans { font-family: 'Syne', sans-serif; }
.font-mono       { font-family: 'Space Mono', monospace; }
</style>
