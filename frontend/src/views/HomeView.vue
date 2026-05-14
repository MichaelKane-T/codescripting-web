<template>
  <AppNav />
  <HeroSection />

  <!-- PROJECTS -->
  <section id="projects" class="bg-[#e8e4de] px-5 py-20 md:px-11 md:py-24">
    <h2 class="mb-10 text-center font-serif text-4xl text-[#1a2340]">
      Projects &amp; Systems
    </h2>

    <div class="mx-auto grid max-w-[940px] grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="p in projects"
        :key="p.slug"
        :project="p"
      />
    </div>
  </section>

  <!-- RESEARCH -->
  <section id="research" class="bg-[#f0ede8] px-5 py-20 md:px-11 md:py-24">
    <h2 class="mb-10 text-center font-serif text-4xl text-[#1a2340]">
      Research Interests
    </h2>

    <div class="mx-auto grid max-w-[940px] grid-cols-1 gap-6 sm:grid-cols-2">
      <ResearchCard
        v-for="r in research"
        :key="r.num"
        :item="r"
      />
    </div>
  </section>

  <!-- SYSTEMS -->
  <section id="systems" class="bg-[#1a2340] px-5 py-[70px] md:px-11">
    <div class="mx-auto flex max-w-[860px] flex-wrap justify-center gap-2.5">
      <span
        v-for="s in stack"
        :key="s"
        class="cursor-default rounded-full border border-white/10 px-[18px] py-2 font-mono text-[11px] tracking-[0.07em] text-[#f0ede8]/45 transition hover:border-[#3b7bd4] hover:text-[#f0ede8]"
      >
        {{ s }}
      </span>
    </div>
  </section>

  <!-- FOOTER -->
  <footer
    id="contact"
    class="flex flex-wrap items-center justify-between gap-5 border-t border-[#1a2340]/10 bg-[#f0ede8] px-5 py-9 md:px-12 md:py-11"
  >
    <div>
      <span class="mb-1 block font-serif text-[22px] font-normal text-[#1a2340]">
        codescripting
      </span>

      <span class="text-[13px] text-slate-600">
        Michael C. &nbsp;·&nbsp; silicon-to-cloud &nbsp;·&nbsp;
        <span class="font-medium text-[#00915a]">● Lab Online</span>
      </span>
    </div>

    <div class="flex gap-7">
      <a href="mailto:hello@codescripting.com" class="text-[13px] text-[#3b7bd4] transition hover:text-[#1a2340]">
        Email
      </a>
      <a href="https://github.com/michaelkane-t/" target="_blank" class="text-[13px] text-[#3b7bd4] transition hover:text-[#1a2340]">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/michael-kane-zim" target="_blank" class="text-[13px] text-[#3b7bd4] transition hover:text-[#1a2340]">
        LinkedIn
      </a>
    </div>
  </footer>
</template>

<script setup>
import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ResearchCard from '../components/ResearchCard.vue'

const projects = [
  {
    slug:'roverpi',
    icon:'🤖',
    status:'Active',
    name:'RoverPi',
    desc:'Autonomous rover using an ESP32 for real-time sensor and motor management, connected over UART to a Raspberry Pi Zero 2 W for higher-level decision making, telemetry, and adaptive local/server-based ML training experiments.',
    tags:['ESP32','Raspberry Pi','UART','Edge AI','ML Training']
  },
  {
    slug:'roverq',
    icon:'🧠',
    status:'Active',
    name:'RoverQ',
    desc:'Advanced autonomous rover platform based on the Arduino Uno Q with onboard STM32 MCU and Qualcomm QRB2210 processor, extended with a Cyclone IV FPGA for hardware acceleration, real-time control, and autonomous robotics research.',
    tags:['Qualcomm','STM32','FPGA','ROS2','FreeRTOS']
  },
  {
    slug:'vga-sprite',
    icon:'⚡',
    status:'Active',
    name:'VGA Sprite Engine',
    desc:'FPGA-based VGA sprite animation system on Basys 3 using SystemVerilog, BRAM rendering, memory-mapped animation frames, and hardware-timed display logic.',
    tags:['SystemVerilog','Basys3','VGA','BRAM']
  },
  {
    slug:'uart-rx',
    icon:'📡',
    status:'Complete',
    name:'UART Receiver',
    desc:'Five-state UART receiver FSM in SystemVerilog with baud-rate timing, parity handling, simulation testbench, and Basys 3 FPGA constraints.',
    tags:['SystemVerilog','FSM','UART','FPGA']
  },
  {
    slug:'power-elec',
    icon:'🔋',
    status:'WIP',
    name:'Power Electronics',
    desc:'Buck, SEPIC, and inverter design work using PWM control, LTspice simulation, converter analysis, and embedded power-system concepts for robotics applications.',
    tags:['LTspice','PWM','SEPIC','DC-DC']
  },
  {
    slug:'infra',
    icon:'🌐',
    status:'Active',
    name:'codescripting Infra',
    desc:'Self-hosted home lab and deployment infrastructure using Nginx, Cloudflare Tunnels, Docker, Linux servers, CI/CD workflows, and remote training/deployment pipelines.',
    tags:['Nginx','Docker','CI/CD','Cloudflare','Linux']
  },
  {
    slug:'laser-dsp',
    icon:'📶',
    status:'Complete',
    name:'Laser Tag DSP',
    desc:'Real-time signal-processing project involving anti-aliasing FIR filter design in MATLAB and embedded C implementation using circular buffers for ESP-IDF.',
    tags:['MATLAB','ESP-IDF','FIR','DSP']
  },
]
const research = [
  {
    num:'01 / Autonomous Systems',
    title:'Small Ground Robot Autonomy',
    desc:'Researching how low-cost ground robots can make reliable navigation and decision-making choices using constrained embedded hardware, distributed processors, and real-time sensor feedback.'
  },
  {
    num:'02 / Edge AI & Training',
    title:'Local vs Server-Based ML Training',
    desc:'Exploring when a robot should train or infer locally versus offloading data to a home server or remote machine, based on compute limits, latency, dataset size, and power constraints.'
  },
  {
    num:'03 / Hardware-Software Co-design',
    title:'Multi-Processor Robotics Architecture',
    desc:'Studying how ESP32, Raspberry Pi, STM32, Qualcomm processors, and FPGAs can work together in one robotics system, with each device handling the tasks it is best suited for.'
  },
  {
    num:'04 / FPGA Acceleration',
    title:'Reconfigurable Computing for Robotics',
    desc:'Investigating FPGA-based acceleration for timing-critical robotics tasks such as sensor preprocessing, vision pipelines, signal filtering, motor timing, and custom hardware interfaces.'
  },
  {
    num:'05 / Embedded Reliability',
    title:'Real-Time Control & Safety',
    desc:'Designing reliable embedded control systems using FSMs, watchdogs, UART communication, FreeRTOS task scheduling, and hardware-level safety layers for autonomous platforms.'
  },
  {
    num:'06 / Power & Deployment',
    title:'Robotic Power Systems and Infrastructure',
    desc:'Working on efficient power conversion, battery-aware system design, and self-hosted infrastructure for training, monitoring, and deploying models to embedded robotic platforms.'
  },
]
const stack = [
  'SystemVerilog','Verilog','FPGA','Basys 3','Cyclone IV',
  'ESP32','ESP-IDF','FreeRTOS','STM32','Raspberry Pi',
  'Qualcomm QRB2210','ROS2','UART','KiCad','LTspice',
  'MATLAB','Python','C / C++','Vue 3','Node.js',
  'Nginx','Docker','Cloudflare','Linux','OPNsense'
]
</script>
