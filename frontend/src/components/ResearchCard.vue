<template>
  <div class="rcard">
    <div class="rnum">{{ item.num }}</div>
    <h3 class="rtitle">{{ item.title }}</h3>
    <p class="rdesc">{{ item.desc }}</p>
  </div>
</template>
<script setup>
defineProps({ item: Object })
</script>
<style scoped>
.rcard {
  padding: 28px;
  border-radius: 14px;
  border: 1px solid rgba(26,35,64,0.1);
  background: rgba(255,255,255,0.5);
  transition: all 0.3s;
}
.rcard:hover {
  border-color: rgba(59,123,212,0.25);
  background: #fff;
  box-shadow: 0 12px 40px rgba(26,35,64,0.08);
  transform: translateY(-3px);
}
.rnum {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: #3b7bd4;
  letter-spacing: 0.12em;
  margin-bottom: 14px;
}
.rtitle {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 20px;
  color: #1a2340;
  margin-bottom: 10px;
  line-height: 1.25;
  font-weight: 400;
}
.rdesc {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: #4a5568;
  line-height: 1.65;
}
</style>
