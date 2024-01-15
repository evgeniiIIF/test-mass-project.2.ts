<template>
  <div class="app-layout">
    <main class="main">
      <slot />
    </main>
  </div>
</template>
<style lang="scss">
.app-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  @include container(943px);
}
.main {
  flex: 1 1 auto;
}
</style>
