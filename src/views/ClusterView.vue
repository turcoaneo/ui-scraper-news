<template>
  <div class="cluster-view">
    <div
      :class="['timestamp-indicator', {'tall-timestamp': true}]"
      v-if="timestamp"
    >
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Cluster, ClusterResponse } from '@/types/cluster'
import { formatTimestamp } from '@/utils/formatTimestamps'

const clusters = ref<Cluster[]>([])
const timestamp = ref('')
const delta = ref('')
const loading = ref(true)

// @ts-ignore
// noinspection JSUnresolvedReference
const DNS_ADDRESS = import.meta.env.VITE_API_URL;

const formattedTimestamp = computed(() =>
  formatTimestamp(timestamp.value, delta.value)
)

const isTallTimestamp = ref(false)

const updateTimestampClass = () => {
  const isMobile = window.innerWidth < 550
  const isLong = formattedTimestamp.value.includes('Verificat:')
  isTallTimestamp.value = isMobile && isLong
}

onUnmounted(() => {
  window.removeEventListener('resize', updateTimestampClass)
})

onMounted(() => {
  const fetchClusters = async () => {
    try {
      const response = await fetch(`${DNS_ADDRESS}/cluster-cached`);
      const data: ClusterResponse = await response.json()
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

  updateTimestampClass()
  window.addEventListener('resize', updateTimestampClass)
})
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.cluster-view {
  position: relative;
  padding-top: 2rem;
}

.tall-timestamp {
  min-height: 2rem;
}

.timestamp-indicator {
  margin-top: -2.5rem;
  padding: 0.2rem;
  top: 0.5rem;
  font-size: small;
  color: #888;
  transition: min-height 0.3s ease;
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
