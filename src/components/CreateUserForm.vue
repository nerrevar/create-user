<template>
  <div class="form p-d-flex p-fluid">
    <div class="form__title">{{ title }}</div>
    <div
      class="form__field-group p-field"
      :class="{
        'p-field-checkbox': item.type === 'checkbox'
      }"
      v-for="(item, index) in filteredFields"
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
        v-model="formData[item.uuid]"
      />
      <Calendar
        v-if="item.type === 'date'"
        :monthNavigator="true"
        :yearNavigator="true"
        :yearRange="`1900:${ new Date().getFullYear() }`"
        v-model="formData[item.uuid]"
      />
      <Dropdown
        v-if="item.type === 'select'"
        :options="item.options"
        optionLabel="name"
        optionValue="id"
        :placeholder="item.placeholder"
        v-model="formData[item.uuid]"
      />
      <Checkbox
        v-if="item.type === 'checkbox'"
        :binary="true"
        :value="item.value"
        :disabled="item.disabled"
        v-model="formData[item.uuid]"
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
        :placeholder="item.placeholder"
        v-model="formData[item.uuid]"
      />
      <Password
        v-if="item.type === 'password'"
        :placeholder="item.placeholder"
        v-model="formData[item.uuid]"
      />
    </div>
    <Button
      :label="sendText"
      @click="sendForm"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, reactive } from 'vue'

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
  reference?: string[] | undefined,
  disabled?: boolean,
  value?: string | number | boolean
}

const props = defineProps<{
  title: string,
  sendText: string,
  fields: IFormField[]
}>()

const filteredFields = computed(() => props.fields.filter(el =>
  !el.reference || el.reference.every(el => !!formData[el])
))

const formData = reactive<{ [key: string]: string | number | boolean }>({})
props.fields.forEach(el => {
  if (el.value)
    formData[el.uuid] = el.value
  else
    switch (el.type) {
      case 'text':
      case 'email':
      case 'date':
      case 'phone':
      case 'password': {
        formData[el.uuid] = ''
        break
      }
      case 'select': {
        formData[el.uuid] = 0
        break
      }
      case 'checkbox': {
        formData[el.uuid] = false
        break
      }
      default: throw new Error('Invalid form field type: ' + el.type)
    }
})

const sendForm = () => {
  setTimeout(
    () => console.log('success'),
    100
  )
}
</script>

<style lang="sass" scoped>
.form
  display: flex
  flex-flow: column nowrap
  gap: 15px

  &__title
    font-size: 1.3em
    font-weight: 600
</style>
