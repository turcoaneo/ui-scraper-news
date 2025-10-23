<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import '@/assets/app.css'
import styles from '@/assets/App.module.css'
</script>

<template>
  <div :class="styles.logo">
    <img alt="Vue logo" src="@/assets/logo.svg" width="125" height="80" />
  </div>
  <div class="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Acasă</RouterLink>
          <RouterLink to="/about">Despre</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
