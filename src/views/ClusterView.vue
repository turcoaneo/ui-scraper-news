<template>
  <div class="cluster-view">
    <div class="timestamp-indicator" v-if="timestamp">
      Actualizat: {{ formattedTimestamp }}
    </div>
    <h1>Știrile de top din sport</h1>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="(cluster, index) in clusters" :key="index" class="cluster">
        <h2>{{ cluster.summary }}</h2>
        <div class="score">Score: {{ cluster.score.toFixed(3) }}</div>
        <div><span>Sites:</span> {{ cluster.sites.join(', ') }}</div>
        <ul>
          <li v-for="(article, i) in cluster.articles" :key="i">
            <a :href="article.url" target="_blank">{{ article.title }}</a>
            <span> | {{ article.site }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const clusters = ref([])
const timestamp = ref('')
const delta = ref('')
const loading = ref(true)

const DNS_ADDRESS = 'http://127.0.0.1:8000'

const formattedTimestamp = computed(() => {
  if (!timestamp.value) return ''
  const mainDate = new Date(timestamp.value)
  const deltaDate = delta.value ? new Date(delta.value) : null

  const mainStr = mainDate.toLocaleString('ro-RO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  if (!deltaDate) return mainStr

  const sameDay =
    mainDate.getFullYear() === deltaDate.getFullYear() &&
    mainDate.getMonth() === deltaDate.getMonth() &&
    mainDate.getDate() === deltaDate.getDate()

  const deltaStr = sameDay
    ? `la ${deltaDate.toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit'
    })}`
    : deltaDate.toLocaleString('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

  return `${mainStr} (Verificat${sameDay ? ' ' : ': '}${deltaStr})`
})

onMounted(() => {
  const fetchClusters = async () => {
    try {
      const response = await fetch(DNS_ADDRESS + '/cluster-cached')
      const data = await response.json()
      clusters.value = data.clusters
      timestamp.value = data.timestamp
      delta.value = data.delta || ''
    } catch (error) {
      console.error('Failed to fetch cached clusters:', error)
    } finally {
      loading.value = false
    }
  }

  fetchClusters()
  setInterval(fetchClusters, 300000)
})
</script>

<style scoped>
.cluster-view {
  position: relative;
  padding-top: 2rem;
}

.timestamp-indicator {
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  font-size: small;
  color: #888;
}

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
