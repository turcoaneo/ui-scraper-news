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
      <p> Topul este calculat prin identificarea știrilor (24h) similare verificând cuvinte cheie
        (pe baza unui model LLM - BERT (”dumitrescustefan”) cu specific românesc, adaptat din
        HuggingFace, plus un model pentru declinarea substantivelor bazat pe T5 -
        SentencePiece).
      </p>
      <p> ”Filtrează” din pagina ”Acasă” permite filtrare prin includere și/sau excludere de
        cuvinte.
      </p>
      <p> ”Becali” este exclus de server și această opțiune nu poate fi editată de utilizator.
      </p>
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
p {
  margin-bottom: 0.75rem;
  text-indent: 0.75rem;
  max-width: 450px;
}
.about {
  padding: 1rem;
  margin-left: 05rem;
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
