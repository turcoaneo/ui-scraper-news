<template>
  <div class="cluster-view">
    <div
      :class="['timestamp-indicator', {'tall-timestamp': true}]"
      v-if="timestamp"
    >
      Actualizat: {{ formattedTimestamp }}
    </div>
    <h1>Știrile de top din sport</h1>

    <div class="but">
      <button @click="showFilters = !showFilters">Filtrează</button>
      <button @click="toggleSort">
        Ordonează
        <span class="arrow" :class="{ down: sortDescending, up: !sortDescending }">
          {{ sortDescending ? '⬇' : '⬆' }}
        </span>
      </button>
    </div>
    <!-- ClusterView.vue -->
    <FilterPanel @apply="fetchClusters" v-if="showFilters" />

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="(cluster, index) in sortedClusters" :key="index" class="cluster">
        <h2>{{ cluster.summary }}</h2>
        <div class="score">Scor: {{ cluster.score.toFixed(3) }}</div>
        <div><span>Siteuri:</span> {{ cluster.sites.join(', ') }}</div>
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
import { useFilterStore } from '@/utils/useFilterStore'
import settings from '@/config/settings'
import FilterPanel from '@/views/FilterPanel.vue'

const DNS_ADDRESS = settings.baseURL

const clusters = ref<Cluster[]>([])
const timestamp = ref('')
const delta = ref('')
const loading = ref(true)

const showFilters = ref(false)

const formattedTimestamp = computed(() =>
  formatTimestamp(timestamp.value, delta.value)
)

const isTallTimestamp = ref(false)

const updateTimestampClass = () => {
  const isMobile = window.innerWidth < 550
  const isLong = formattedTimestamp.value.includes('Verificat:')
  isTallTimestamp.value = isMobile && isLong
}

const filterStore = useFilterStore()

const fetchClusters = async () => {
  try {
    const endpoint = `${DNS_ADDRESS}/cluster-cached-filtered`
    const payload = {
      filter_places: filterStore.filterPlaces,
      filter_including: filterStore.filterIncluding,
      filter_excluding: filterStore.filterExcluding
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data: ClusterResponse = await response.json()
    clusters.value = data.clusters
    timestamp.value = data.timestamp
    delta.value = data.delta || ''
  } catch (error) {
    console.error('Failed to fetch filtered clusters:', error)
  } finally {
    loading.value = false
  }
}

const sortDescending = ref(true)

const toggleSort = () => {
  sortDescending.value = !sortDescending.value
}

const sortedClusters = computed<Cluster[]>(() => {
  return [...clusters.value].sort((a, b) =>
    sortDescending.value
      ? b.score - a.score   // descending
      : a.score - b.score   // ascending
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', updateTimestampClass)
})

onMounted(() => {

  fetchClusters()
  setInterval(fetchClusters, 300000)

  updateTimestampClass()
  window.addEventListener('resize', updateTimestampClass)
})
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.arrow {
  display: inline-block;
  padding: 0.0rem 0.3rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bolder;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  transform-origin: center;
}

/* Down state */
.arrow.down {
  background-color: #181818;
  color: #00bd7e;
  transform: rotateY(0deg); /* facing forward */
}

/* Up state */
.arrow.up {
  background-color: #00bd7e;
  color: #181818;
  transform: rotateY(180deg); /* flipped horizontally */
}

.but {
  margin-bottom: 0.4rem;
  margin-top: 0.2rem;
  display: flex;
  gap: 0.75rem;
}

.but button {
  padding: 0.2rem 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #35495e;
  color: #00bd7e;
  cursor: pointer;
}

.cluster-view {
  position: relative;
  padding-top: 2rem;
}

.cluster {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
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

.score {
  padding: 0.5rem;
  color: #41b883;
  font-size: smaller;
}
</style>
