<template>
  <a :href="project.url || '#'" class="card">
    <div class="card-bar"></div>
    <div class="card-body">
      <div class="card-top">
        <div class="card-icon">{{ project.icon }}</div>
        <span :class="['badge', `badge--${project.status.toLowerCase()}`]">{{ project.status }}</span>
      </div>
      <h3 class="card-name">{{ project.name }}</h3>
      <p class="card-desc">{{ project.desc }}</p>
      <div class="card-tags">
        <span v-for="t in project.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </div>
  </a>
</template>

<script setup>
defineProps({ project: Object })
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(26,35,64,0.1);
  background: rgba(255,255,255,0.65);
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(59,123,212,0.3);
  background: #fff;
  box-shadow: 0 20px 60px rgba(26,35,64,0.1);
}
.card-bar {
  height: 3px;
  background: #3b7bd4;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
.card:hover .card-bar { transform: scaleX(1); }
.card-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.card-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(26,35,64,0.1);
  background: #f0ede8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.badge {
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px;
  padding: 3px 10px;
  border-radius: 100px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  border: 1px solid transparent;
}
.badge--active   { color:#00734a; background:rgba(0,196,122,0.1);  border-color:rgba(0,196,122,0.22); }
.badge--wip      { color:#8a5700; background:rgba(255,179,0,0.1);  border-color:rgba(255,179,0,0.22); }
.badge--complete { color:#1e3a6e; background:rgba(59,123,212,0.1); border-color:rgba(59,123,212,0.22); }
.card-name {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 19px;
  color: #1a2340;
  margin-bottom: 8px;
  line-height: 1.2;
  font-weight: 400;
}
.card-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: #4a5568;
  line-height: 1.65;
  margin-bottom: 16px;
  flex: 1;
}
.card-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px;
  padding: 3px 9px;
  border-radius: 100px;
  border: 1px solid rgba(26,35,64,0.12);
  color: #4a5568;
  background: #f0ede8;
}
</style>
