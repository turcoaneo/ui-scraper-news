<template>
  <div class="about">
    <h1>Topul știrilor zilnice de sport din online</h1>
    <h2>
      O selecție a știrilor de sport din principalele siteuri online de specialitate:
    </h2>
    <ul class="list">
      <li v-for="site in sites" :key="site">{{ site }}</li>
    </ul>
    <div class="info">
      Topul este calculat prin identificarea știrilor similare verificând cuvinte cheie
      <br />
      (pe baza unui model (”dumitrescustefan”) LLM - BERT cu specific românesc, adaptat din
      HuggingFace).
      <br />
      Butonul ”Filtrează” din pagina ”Acasă” permite filtrare prin includere și/sau excludere de
      cuvinte.
      <br />
      ”Becali” este exclus de server și această opțiune nu poate fi editată de utilizator.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import settings from '@/config/settings.js'

const DNS_ADDRESS = settings.baseURL

const sites = ref([])

onMounted(async () => {
  try {
    const endpoint = `${DNS_ADDRESS}/sites`
    const response = await fetch(endpoint)
    sites.value = await response.json()
  } catch (err) {
    console.error('Failed to fetch sites:', err)
    sites.value = [] // fallback
  }
})
</script>

<style scoped>
.about {
  padding: 1rem;
}

.list {
  color: #00bd7e;
  margin-left: 1rem;
}

.info {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  color: #266d4d;
  font-size: 0.75rem;
}
</style>
