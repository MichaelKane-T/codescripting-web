<template>
  <main class="min-h-screen bg-[#f0ede8] text-[#1a2340]">
    <section class="mx-auto max-w-5xl px-5 py-24 md:px-10">
      <p class="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#3b7bd4]">
        Current Research Direction
      </p>

      <h1 class="mb-6 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
        Task Allocation and Learning Strategies in Heterogeneous Edge Robotics Systems
      </h1>

      <p class="max-w-3xl text-lg leading-8 text-slate-700">
        I am researching how small autonomous robots can decide where computation should happen:
        locally on embedded hardware, on a higher-level onboard processor, on an FPGA accelerator,
        or remotely on a home server.
      </p>
    </section>

    <section class="bg-[#e8e4de] px-5 py-20 md:px-10">
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <div class="rounded-3xl bg-white/60 p-7 shadow-sm">
          <h2 class="mb-3 font-serif text-3xl">RoverPi</h2>
          <p class="leading-7 text-slate-700">
            RoverPi uses an ESP32 for real-time sensor and motor management, connected over UART
            to a Raspberry Pi Zero 2 W. The Raspberry Pi handles higher-level decision making,
            telemetry, and adaptive learning experiments.
          </p>
        </div>

        <div class="rounded-3xl bg-white/60 p-7 shadow-sm">
          <h2 class="mb-3 font-serif text-3xl">RoverQ</h2>
          <p class="leading-7 text-slate-700">
            RoverQ is based on the Arduino Uno Q platform with an onboard STM32 MCU and Qualcomm
            processor, extended with a Cyclone IV FPGA for hardware acceleration, timing-critical
            control, and robotics research.
          </p>
        </div>
      </div>
    </section>

    <section class="px-5 py-20 md:px-10">
      <div class="mx-auto max-w-5xl">
        <h2 class="mb-8 font-serif text-4xl">What I am working on</h2>

        <div class="grid gap-5 md:grid-cols-3">
          <div
            v-for="item in focusAreas"
            :key="item.title"
            class="rounded-3xl border border-[#1a2340]/10 bg-white/50 p-6"
          >
            <p class="mb-3 text-3xl">{{ item.icon }}</p>
            <h3 class="mb-2 text-xl font-semibold">{{ item.title }}</h3>
            <p class="text-sm leading-6 text-slate-700">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#1a2340] px-5 py-20 text-[#f0ede8] md:px-10">
      <div class="mx-auto max-w-5xl">
        <h2 class="mb-6 font-serif text-4xl">Research Goal</h2>

        <p class="max-w-3xl leading-8 text-[#f0ede8]/75">
          The goal is to study how heterogeneous robotic systems can intelligently divide work
          across microcontrollers, single-board computers, FPGAs, and remote servers. The long-term
          direction is to build autonomous robots that can balance latency, power, safety, and
          learning performance.
        </p>

        <RouterLink
          to="/"
          class="mt-10 inline-flex rounded-full border border-[#f0ede8]/20 px-6 py-3 text-sm transition hover:border-[#3b7bd4] hover:text-[#3b7bd4]"
        >
          Back Home
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
const focusAreas = [
  {
    icon: '🧠',
    title: 'Task Allocation',
    desc: 'Deciding which processor should handle sensing, control, planning, learning, or acceleration tasks.',
  },
  {
    icon: '🤖',
    title: 'Edge Robotics',
    desc: 'Building rover systems that can operate with limited compute, power, memory, and network access.',
  },
  {
    icon: '⚡',
    title: 'FPGA Acceleration',
    desc: 'Using reconfigurable hardware for timing-critical tasks like sensor preprocessing, filtering, and vision pipelines.',
  },
  {
    icon: '🌐',
    title: 'Server Offloading',
    desc: 'Testing when training or heavier computation should move from the robot to a home server.',
  },
  {
    icon: '📡',
    title: 'Inter-Processor Communication',
    desc: 'Using UART and other links to coordinate ESP32, Raspberry Pi, STM32, Qualcomm, and FPGA devices.',
  },
  {
    icon: '🔋',
    title: 'Power-Aware Autonomy',
    desc: 'Studying how battery limits affect local compute, remote compute, and real-time robotic decisions.',
  },
]
</script>