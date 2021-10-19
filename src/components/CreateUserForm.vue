<template>
  <div class="form p-d-flex p-fluid">
    <div class="form__title">{{ title }}</div>
    <div
      class="form__field-group p-field"
      :class="{
        'p-field-checkbox': item.type === 'checkbox'
      }"
      v-for="(item, index) in fields"
      :key="index"
    >
      <label
        v-if="item.type !== 'checkbox'"
        :for="item.uuid"
      >
        {{ item.label }}
        <span
          v-if="item.required"
          style="color: var(--text-color-danger)"
        >
          *
        </span>
      </label>

      <InputText
        class="form__field"
        v-if="['text', 'email'].includes(item.type)"
        :id="item.uuid"
        :placeholder="item.placeholder"
      />
      <Calendar
        v-if="item.type === 'date'"
        :monthNavigator="true"
        :yearNavigator="true"
        :yearRange="`1900:${ new Date().getFullYear() }`"
      />
      <Dropdown
        v-if="item.type === 'select'"
        :options="item.options"
        optionLabel="name"
        optionValue="id"
      />
      <Checkbox
        v-if="item.type === 'checkbox'"
        :binary="true"
        :value="item.value"
        :disabled="item.disabled"
      />
      <label
        v-if="item.type === 'checkbox'"
        :for="item.uuid"
      >
        {{ item.label }}
        <span
          v-if="item.required"
          style="color: var(--text-color-danger)"
        >
          *
        </span>
      </label>
      <InputMask
        v-if="item.type === 'phone'"
        mask="+7 999 999 99 99"
      />
      <Password
        v-if="item.type === 'password'"
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

export interface ISelectOption {
  name: string,
  id: number
}

export interface IFormField {
  type: 'text' | 'email' | 'date' | 'select' | 'checkbox' | 'phone' | 'password',
  uuid: string,
  label: string,
  required: boolean,
  placeholder?: string,
  options?: ISelectOption[],
  reference?: string[]
  disabled?: boolean,
  value?: string | number | boolean
}

defineProps<{
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
