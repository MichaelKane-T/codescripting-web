<template>
  <nav class="nav">
    <a href="#" class="nav-logo">
      <div class="nav-mark">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <polygon points="11,3 20,19 2,19" fill="none" stroke="#f0ede8" stroke-width="1.6" stroke-linejoin="round"/>
          <line x1="11" y1="10" x2="11" y2="15" stroke="#3b7bd4" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="11" cy="8" r="1.2" fill="#3b7bd4"/>
        </svg>
      </div>
      <div class="nav-brand">
        <span class="nav-name">codescripting</span>
        <span class="nav-tagline">silicon · systems · cloud</span>
      </div>
    </a>

    <ul class="nav-links">
      <li v-for="l in links" :key="l.label">
        <a :href="l.href" class="nav-link" :class="{ 'nav-link--active': l.active }">
          {{ l.label }}
        </a>
      </li>
    </ul>

    <div class="lab-badge">
      <span class="lab-dot"></span>
      Lab Online
    </div>
  </nav>
</template>

<script setup>
const links = [
  { label: 'Projects', href: '#projects', active: true  },
  { label: 'Research', href: '#research', active: false },
  { label: 'Systems',  href: '#systems',  active: false },
  { label: 'Contact',  href: '#contact',  active: false },
]
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 44px;
  height: 68px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-mark {
  width: 38px; height: 38px;
  border-radius: 6px;
  background: #1a2340;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-brand { line-height: 1.2; }

.nav-name {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1a2340;
}

.nav-tagline {
  display: block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px;
  color: #9aa3b0;
  letter-spacing: 0.06em;
  margin-top: 1px;
}

.nav-links {
  display: flex;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #4a5568;
  text-decoration: none;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 4px;
  transition: color 0.2s;
  white-space: nowrap;
}
.nav-link:hover,
.nav-link--active { color: #3b7bd4; }

.lab-badge {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 100px;
  background: rgba(240, 237, 232, 0.92);
  border: 1px solid rgba(26, 35, 64, 0.12);
  backdrop-filter: blur(10px);
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  color: #4a5568;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 2px 14px rgba(26,35,64,0.09);
}

.lab-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #00c47a;
  box-shadow: 0 0 8px rgba(0,196,122,0.8);
  animation: blink 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes blink {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

@media (max-width: 768px) {
  .nav { padding: 0 20px; }
  .nav-links { display: none; }
}
</style>
