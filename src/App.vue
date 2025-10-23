<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import '@/assets/app.css'
import styles from '@/assets/App.module.css'
</script>

<template>


  <header>
    <img alt="Vue logo" :class="styles.logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Acasă</RouterLink>
        <RouterLink to="/about">Despre</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
