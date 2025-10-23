<template>
  <div class="cluster-view">
    <h1>Știrile de top din sport</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="(cluster, index) in clusters" :key="index" class="cluster">
        <h2>{{cluster.summary}}</h2>
        <div class="score">Score: {{ cluster.score }}</div>
        <div><span>Sites:</span> {{ cluster.sites.join(', ') }}</div>
        <ul>
          <li v-for="(article, i) in cluster.articles" :key="i">
            <a :href="article.url" target="_blank">{{ article.title }}</a>
            <span> | {{article.site}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const clusters = ref([])
const loading = ref(true)

onMounted(() => {
  const DNS_ADDRESS = 'http://127.0.0.1:8000'

  const fetchClusters = async () => {
    try {
      const response = await fetch(DNS_ADDRESS + '/cluster')
      clusters.value = await response.json()
    } catch (error) {
      console.error('Failed to fetch clusters:', error)
    } finally {
      loading.value = false
    }
  }

  fetchClusters() // initial fetch

  // refresh every 10 minutes
  setInterval(fetchClusters, 300000)
})
</script>

<style scoped>
.cluster {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.score {
  padding: 0.5rem;
  color: #41b883;
  font-size: smaller;
}
</style>
