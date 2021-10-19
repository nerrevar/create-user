<template>
  <div class="form p-d-flex p-fluid">
    <div class="form__title">{{ title }}</div>
    <div
      class="form__field-group p-field"
      v-for="(item, index) in fields"
      :key="index"
    >
      <label :for="item.uuid">{{ item.label }}</label>

      <InputText
        class="form__field"
        v-if="item.type === 'text'"
        :id="item.uuid"
      />
    </div>
    <div
      class="form__submit"
      @click="sendForm"
    >
      {{ sendText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

export interface IFormField {
  type: 'text',
  uuid: string,
  label: string
}

const props = defineProps<{
  title: string,
  sendText: string,
  fields: IFormField[]
}>()

const sendForm = () => {
  setTimeout(
    () => console.log('success'),
    100
  )
}
</script>
