<template>
  <div class="tag-input">
    <div class="input-row">
      <label class="tag-label">{{ labelText }}</label>
      <input
        v-model="newTag"
        @keyup.enter="addTag"
        placeholder="Adaugă aici..."
        class="tag-field"
      />
      <button type="button" @click="addTag" class="add-btn">+</button>
    </div>

    <div class="tags">
      <!-- permanent tags -->
      <span
        v-for="(tag, index) in permanentTags"
        :key="'perm-' + index"
        class="tag permanent"
      >
        {{ tag }}
        <small class="caption">Nume exclus de server</small>
      </span>

      <!-- dynamic tags -->
      <span v-for="(tag, index) in modelValue" :key="index" class="tag">
        {{ tag }}
        <button type="button" @click="removeTag(index)">×</button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
  labelText: string
  permanentTags?: string[]   // 👈 new optional prop
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const newTag = ref('')

const addTag = () => {
  if (newTag.value.trim()) {
    emit('update:modelValue', [...props.modelValue, newTag.value.trim()])
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<style scoped>
.tag-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-label {
  font-weight: 500;
  width: 130px;
}

.tag-field {
  flex: 1;
  min-width: 150px;
  max-width: 250px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  padding: 0.25rem 0.75rem;
  border: none;
  background: #41b883;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}
.add-btn:hover {
  background: #369f6b;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  background: #eee;
  color: #00bd7e;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
}

.tag button {
  margin-left: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
}

/* permanent tag styling */
.tag.permanent {
  /* background: #41b883;
    color: #fff; */
  background: #eee;
  color: #00bd7e;
  font-weight: 600;
}
.tag.permanent .caption {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  font-weight: normal;
  opacity: 0.85;
}
</style>
