<template>
  <section class="hero">
    <svg class="hero-svg" viewBox="0 0 1400 820"
         preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="#1a2340" opacity="0.1"/>
        </pattern>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1400" height="820" fill="#f0ede8"/>
      <rect width="1400" height="820" fill="url(#dots)"/>

      <!-- far hills -->
      <path d="M0,540 Q80,490 140,510 Q200,525 260,495 Q320,465 390,480 Q450,492 510,460 Q570,432 640,448 Q710,462 780,435 Q840,412 900,430 Q960,448 1030,418 Q1100,390 1160,408 Q1220,424 1280,400 Q1340,378 1400,392 L1400,820 L0,820 Z"
            fill="#e0dbd3" stroke="#1a2340" stroke-width="0.6" opacity="0.6"/>
      <!-- mid hills -->
      <path d="M0,580 Q60,548 110,562 Q170,578 230,548 Q300,516 360,534 Q420,550 480,522 Q540,495 600,512 Q660,528 730,500 Q800,472 860,490 Q920,508 990,478 Q1060,448 1120,468 Q1185,488 1250,458 Q1310,432 1370,450 Q1390,455 1400,452 L1400,820 L0,820 Z"
            fill="#d8d4cc" stroke="#1a2340" stroke-width="0.7" opacity="0.7"/>
      <!-- main ground -->
      <path d="M0,640 Q30,632 55,638 Q80,644 100,628 Q125,610 148,618 Q165,624 182,614 Q202,602 224,608 Q250,616 270,604 Q295,590 318,596 Q340,602 360,590 Q385,576 408,582 Q432,588 452,576 Q474,562 498,568 Q522,574 545,560 Q568,546 592,552 Q615,558 638,544 Q660,532 684,538 Q708,544 730,530 Q754,516 778,522 Q802,528 824,514 Q848,500 872,506 Q896,512 918,498 Q940,484 965,490 Q990,496 1012,482 Q1035,468 1060,474 Q1085,480 1108,466 Q1130,452 1155,458 Q1180,464 1202,450 Q1228,434 1252,440 Q1275,446 1300,432 Q1330,416 1360,424 Q1385,430 1400,422 L1400,820 L0,820 Z"
            fill="#ccc8c0" stroke="#1a2340" stroke-width="1" opacity="0.9"/>

      <!-- rocks -->
      <g opacity="0.75">
        <ellipse cx="95" cy="618" rx="22" ry="10" fill="#bab6ae" stroke="#1a2340" stroke-width="0.8"/>
        <path d="M73,618 Q85,600 100,602 Q115,603 117,618" fill="#c8c4bc" stroke="#1a2340" stroke-width="0.8"/>
        <ellipse cx="145" cy="610" rx="14" ry="7" fill="#b5b1a9" stroke="#1a2340" stroke-width="0.7"/>
      </g>
      <g opacity="0.7">
        <ellipse cx="310" cy="600" rx="18" ry="8" fill="#b8b4ac" stroke="#1a2340" stroke-width="0.8"/>
        <path d="M292,600 Q302,584 314,586 Q326,587 328,600" fill="#c5c1b9" stroke="#1a2340" stroke-width="0.8"/>
        <ellipse cx="348" cy="595" rx="11" ry="6" fill="#b0aca4" stroke="#1a2340" stroke-width="0.7"/>
      </g>
      <g opacity="0.72">
        <ellipse cx="530" cy="572" rx="24" ry="11" fill="#bab6ae" stroke="#1a2340" stroke-width="0.8"/>
        <path d="M506,572 Q520,552 535,554 Q550,555 554,572" fill="#c8c4bc" stroke="#1a2340" stroke-width="0.8"/>
        <ellipse cx="570" cy="566" rx="13" ry="6" fill="#b2aea6" stroke="#1a2340" stroke-width="0.7"/>
        <ellipse cx="496" cy="580" rx="9" ry="5" fill="#bcb8b0" stroke="#1a2340" stroke-width="0.6"/>
      </g>
      <g opacity="0.7">
        <ellipse cx="750" cy="538" rx="20" ry="9" fill="#b6b2aa" stroke="#1a2340" stroke-width="0.8"/>
        <path d="M730,538 Q742,520 754,522 Q766,523 770,538" fill="#c3bfb7" stroke="#1a2340" stroke-width="0.8"/>
        <ellipse cx="786" cy="532" rx="12" ry="5" fill="#aeaaa2" stroke="#1a2340" stroke-width="0.7"/>
      </g>
      <g opacity="0.68">
        <ellipse cx="970" cy="500" rx="26" ry="12" fill="#b8b4ac" stroke="#1a2340" stroke-width="0.8"/>
        <path d="M944,500 Q958,478 972,480 Q988,481 996,500" fill="#c5c1b9" stroke="#1a2340" stroke-width="0.8"/>
        <ellipse cx="1012" cy="494" rx="14" ry="7" fill="#b0aca4" stroke="#1a2340" stroke-width="0.7"/>
      </g>
      <g opacity="0.7">
        <ellipse cx="1200" cy="464" rx="30" ry="14" fill="#b5b1a9" stroke="#1a2340" stroke-width="0.9"/>
        <path d="M1170,464 Q1186,440 1202,442 Q1220,443 1230,464" fill="#c2beb6" stroke="#1a2340" stroke-width="0.8"/>
        <ellipse cx="1245" cy="456" rx="16" ry="7" fill="#aeaaa2" stroke="#1a2340" stroke-width="0.7"/>
      </g>

      <!-- topo lines bottom right -->
      <g stroke="#1a2340" fill="none" opacity="0.1">
        <path d="M900,720 Q1000,680 1100,700 Q1200,718 1300,685 Q1370,664 1400,670 L1400,820 L900,820 Z" stroke-width="0.8"/>
        <path d="M940,748 Q1040,706 1140,726 Q1230,742 1320,712 Q1375,694 1400,700" stroke-width="0.7"/>
        <path d="M980,775 Q1080,732 1180,752 Q1265,768 1350,740 Q1390,726 1400,730" stroke-width="0.6"/>
      </g>

      <!-- rover shadow -->
      <ellipse cx="0" cy="4" rx="36" ry="7" fill="#1a2340" opacity="0.07">
        <animateMotion dur="18s" repeatCount="indefinite"
          path="M-100,640 Q200,600 400,580 Q600,560 700,550 Q850,535 1100,503 Q1250,483 1500,455"/>
      </ellipse>

      <!-- rover -->
      <g>
        <!-- suspension arms -->
        <line x1="-38" y1="2"  x2="-52" y2="14" stroke="#1a2340" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="-14" y1="-4" x2="-28" y2="10" stroke="#1a2340" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="38"  y1="2"  x2="52"  y2="14" stroke="#1a2340" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="14"  y1="-4" x2="28"  y2="10" stroke="#1a2340" stroke-width="1.8" stroke-linecap="round"/>
        <!-- chassis -->
        <rect x="-42" y="-18" width="84" height="28" rx="5" fill="#e0dbd3" stroke="#1a2340" stroke-width="1.2"/>
        <!-- solar panels -->
        <rect x="-68" y="-28" width="32" height="18" rx="2" fill="#d0ccc4" stroke="#1a2340" stroke-width="0.9"/>
        <rect x="36"  y="-28" width="32" height="18" rx="2" fill="#d0ccc4" stroke="#1a2340" stroke-width="0.9"/>
        <line x1="-57" y1="-28" x2="-57" y2="-10" stroke="#1a2340" stroke-width="0.5" opacity="0.4"/>
        <line x1="-46" y1="-28" x2="-46" y2="-10" stroke="#1a2340" stroke-width="0.5" opacity="0.4"/>
        <line x1="-68" y1="-21" x2="-36" y2="-21" stroke="#1a2340" stroke-width="0.5" opacity="0.4"/>
        <line x1="47"  y1="-28" x2="47"  y2="-10" stroke="#1a2340" stroke-width="0.5" opacity="0.4"/>
        <line x1="58"  y1="-28" x2="58"  y2="-10" stroke="#1a2340" stroke-width="0.5" opacity="0.4"/>
        <line x1="36"  y1="-21" x2="68"  y2="-21" stroke="#1a2340" stroke-width="0.5" opacity="0.4"/>
        <!-- mast -->
        <line x1="8" y1="-18" x2="8" y2="-52" stroke="#1a2340" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="-4" y1="-44" x2="22" y2="-44" stroke="#1a2340" stroke-width="1.2" stroke-linecap="round"/>
        <rect x="-2" y="-58" width="14" height="10" rx="2.5" fill="#d8d4cc" stroke="#1a2340" stroke-width="1"/>
        <circle cx="5" cy="-53" r="3" fill="#3b7bd4" filter="url(#glow)"/>
        <!-- dish -->
        <line x1="-38" y1="-18" x2="-55" y2="-38" stroke="#1a2340" stroke-width="1"/>
        <path d="M-65,-44 Q-55,-54 -45,-44" fill="none" stroke="#1a2340" stroke-width="1.4" stroke-linecap="round"/>
        <!-- signal arcs -->
        <path d="M-38,-42 Q-32,-36 -38,-30" fill="none" stroke="#3b7bd4" stroke-width="0.9" opacity="0.8"/>
        <path d="M-33,-46 Q-24,-36 -33,-26" fill="none" stroke="#3b7bd4" stroke-width="0.7" opacity="0.5"/>
        <!-- wheels -->
        <circle cx="-52" cy="20" r="13" fill="#c8c4bc" stroke="#1a2340" stroke-width="1.2"/>
        <circle cx="-52" cy="20" r="7"  fill="#bab6ae" stroke="#1a2340" stroke-width="0.8"/>
        <line x1="-52" y1="7"  x2="-52" y2="33" stroke="#1a2340" stroke-width="0.9" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 -52 20" to="360 -52 20" dur="1s" repeatCount="indefinite"/>
        </line>
        <line x1="-65" y1="20" x2="-39" y2="20" stroke="#1a2340" stroke-width="0.9" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 -52 20" to="360 -52 20" dur="1s" repeatCount="indefinite"/>
        </line>
        <circle cx="-28" cy="24" r="11" fill="#c8c4bc" stroke="#1a2340" stroke-width="1.1"/>
        <circle cx="-28" cy="24" r="6"  fill="#bab6ae" stroke="#1a2340" stroke-width="0.7"/>
        <line x1="-28" y1="13" x2="-28" y2="35" stroke="#1a2340" stroke-width="0.8" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 -28 24" to="360 -28 24" dur="1s" repeatCount="indefinite"/>
        </line>
        <line x1="-39" y1="24" x2="-17" y2="24" stroke="#1a2340" stroke-width="0.8" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 -28 24" to="360 -28 24" dur="1s" repeatCount="indefinite"/>
        </line>
        <circle cx="28" cy="22" r="12" fill="#c8c4bc" stroke="#1a2340" stroke-width="1.1"/>
        <circle cx="28" cy="22" r="6.5" fill="#bab6ae" stroke="#1a2340" stroke-width="0.7"/>
        <line x1="28" y1="10" x2="28" y2="34" stroke="#1a2340" stroke-width="0.9" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 28 22" to="360 28 22" dur="1s" repeatCount="indefinite"/>
        </line>
        <line x1="16" y1="22" x2="40" y2="22" stroke="#1a2340" stroke-width="0.9" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 28 22" to="360 28 22" dur="1s" repeatCount="indefinite"/>
        </line>
        <circle cx="52" cy="20" r="13" fill="#c8c4bc" stroke="#1a2340" stroke-width="1.2"/>
        <circle cx="52" cy="20" r="7"  fill="#bab6ae" stroke="#1a2340" stroke-width="0.8"/>
        <line x1="52" y1="7"  x2="52" y2="33" stroke="#1a2340" stroke-width="0.9" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 52 20" to="360 52 20" dur="1s" repeatCount="indefinite"/>
        </line>
        <line x1="39" y1="20" x2="65" y2="20" stroke="#1a2340" stroke-width="0.9" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 52 20" to="360 52 20" dur="1s" repeatCount="indefinite"/>
        </line>
        <!-- dust -->
        <circle cx="-70" cy="28" r="3" fill="#c8c4bc" opacity="0.5">
          <animate attributeName="cx" from="-70" to="-120" dur="0.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite"/>
          <animate attributeName="cy" from="28" to="40" dur="0.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="-80" cy="24" r="2" fill="#c0bcb4" opacity="0.35">
          <animate attributeName="cx" from="-80" to="-140" dur="1.1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.35" to="0" dur="1.1s" repeatCount="indefinite"/>
          <animate attributeName="cy" from="24" to="38" dur="1.1s" repeatCount="indefinite"/>
        </circle>
        <animateMotion dur="18s" repeatCount="indefinite"
          path="M-100,640 Q200,600 400,580 Q600,560 700,550 Q850,535 1100,503 Q1250,483 1500,455"/>
      </g>
    </svg>

    <!-- Text overlay -->
     <!-- Text overlay -->
    <div class="hero-content">
      <h1 class="hero-headline">
        Engineering Systems<br />
        from <em>Silicon</em> to Cloud.
      </h1>

      <div class="hero-buttons">
        <RouterLink to="/current-work" class="btn-primary">
          View Current Work
        </RouterLink>
      </div>
    </div>

    <!-- Scroll -->
    <div class="scroll-ind">
      <span class="scroll-label">Scroll</span>
      <div class="scroll-circle">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M3 8l4 4 4-4" stroke="#3b7bd4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f0ede8;
}
.hero-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
  padding: 0 24px;
  margin-top: -60px;
  text-align: center;
}
.hero-headline {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(38px, 6vw, 78px);
  line-height: 1.06;
  color: #1a2340;
  letter-spacing: -0.01em;
  margin-bottom: 36px;
  animation: fadeUp 1s 0.3s cubic-bezier(0.22,1,0.36,1) both;
}
.hero-headline em {
  font-style: italic;
  color: #3b7bd4;
}
.scroll-ind {
  position: absolute;
  bottom: 32px;
  right: 44px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: fadeIn 1s 1.4s both;
}
.scroll-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #4a5568;
}
.scroll-circle {
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 2px solid #3b7bd4;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

/* override btn pointer events in hero */
:deep(.btn-primary) { pointer-events: all; animation: fadeUp 1s 0.5s cubic-bezier(0.22,1,0.36,1) both; }
</style>
