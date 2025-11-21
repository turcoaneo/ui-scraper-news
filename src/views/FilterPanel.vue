<template>
  <div class="filter-panel">
    <div class="filter-row">
      <label class="tag-label">Caută după:</label>
      <multiselect
        v-model="filterStore.filterPlaces"
        :options="['title', 'summary', 'keywords', 'entities']"
        :multiple="true"
        :close-on-select="false"
        placeholder="Selectează câmpuri"
        :custom-label="(opt: string) => labelMap[opt]"
        selectedLabel="Selectat"
        selectLabel="Enter pt. selecție"
        deselectLabel="Enter pt. deselecție"
        class="filter-select"
      />
    </div>

    <TagInput v-model="filterStore.filterIncluding" labelText="Include dacă conține:" />
    <TagInput v-model="filterStore.filterExcluding" labelText="Exclude dacă conține:" />

    <button @click="applyFilters">Aplică filtre</button>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/utils/useFilterStore'
import TagInput from '@/views/TagInput.vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

// mapping dictionary
const labelMap: Record<string, string> = {
  title: 'Titlu',
  summary: 'Rezumat',
  keywords: 'Cuvinte cheie',
  entities: 'Entități'
}

const filterStore = useFilterStore()
const emit = defineEmits(['apply'])

const applyFilters = () => {
  emit('apply') // ClusterView listens for this
}

</script>

<style scoped>
.filter-panel {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #ddd;          /* softer neutral border */
  border-radius: 10px;
  background-color: #34495e;       /* subtle background */
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;
  gap: 1rem;                       /* spacing between rows */
}

.filter-panel button {
  align-self: flex-start;          /* button aligns left */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #41b883;       /* Vue green accent */
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.filter-panel button:hover {
  background-color: #369f6b;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag-label {
  font-weight: 500;
  width: 127px; /* keeps label readable */
}

.filter-select {
  flex: 1;
  min-width: 150px;
  max-width: 250px; /* keeps dropdown compact */
}
</style>
