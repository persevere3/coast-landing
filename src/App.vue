<template>
  <router-view />
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss">
/* global small reset */
html,body,#app { 
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  
  height: 100vh; 
  height: 100svh; 
  height: 100dvh;
  
  overflow: hidden;
  
  margin: 0;
  padding: 0; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

* {
  box-sizing: border-box;
}

</style>
