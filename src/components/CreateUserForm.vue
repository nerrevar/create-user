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
        v-if="['text', 'email'].includes(item.type)"
        class="form__field"
        :class="{
          'p-invalid': v$[item.formField]?.$message
        }"
        :id="item.uuid"
        :placeholder="item.placeholder"
        v-model="formData[item.formField]"
      />
      <Calendar
        v-if="item.type === 'date'"
        class="form__field"
        :class="{
          'p-invalid': v$[item.formField]?.$message
        }"
        :id="item.uuid"
        :monthNavigator="true"
        :yearNavigator="true"
        :yearRange="`1900:${ new Date().getFullYear() }`"
        v-model="formData[item.formField]"
      />
      <Dropdown
        v-if="item.type === 'select'"
        class="form__field"
        :class="{
          'p-invalid': v$[item.formField]?.$message
        }"
        :id="item.uuid"
        :options="item.options"
        optionLabel="name"
        optionValue="id"
        :placeholder="item.placeholder"
        v-model="formData[item.formField]"
      />
      <Checkbox
        v-if="item.type === 'checkbox'"
        class="form__field"
        :class="{
          'p-invalid': v$[item.formField]?.$message
        }"
        :id="item.uuid"
        :binary="true"
        :value="item.value"
        :disabled="item.disabled"
        v-model="formData[item.formField]"
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
        class="form__field"
        :class="{
          'p-invalid': v$[item.formField]?.$message
        }"
        :id="item.uuid"
        mask="+7 999 999 99 99"
        :placeholder="item.placeholder"
        v-model="formData[item.formField]"
      />
      <Password
        v-if="item.type === 'password'"
        class="form__field"
        :class="{
          'p-invalid': v$[item.formField]?.$message
        }"
        :id="item.uuid"
        :placeholder="item.placeholder"
        :feedback="false"
        toggleMask
        v-model="formData[item.formField]"
        @change="formData[item.formField] = $event.target.value"
      />

      <div
        class="form__error"
        style="color: var(--text-danger)"
        v-for="(item, index) in v$[item.formField]?.$errors"
        :key="index"
      >
        {{ item.$message }}
      </div>
    </div>
    <slot />
    <Button
      :label="sendText"
      @click="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, reactive } from 'vue'
import useVuelidate, { ValidationArgs, ValidationRule } from '@vuelidate/core'

export interface ISelectOption {
  name: string,
  id: number
}

export interface IFormField {
  type: 'text' | 'email' | 'date' | 'select' | 'checkbox' | 'phone' | 'password',
  uuid: string,
  formField: string,
  label: string,
  required: boolean,
  placeholder?: string,
  options?: ISelectOption[],
  reference?: string[] | undefined,
  disabled?: boolean,
  value?: string | number | boolean,
  validators?: { [key: string]: ValidationRule }
}

const props = defineProps<{
  title: string,
  sendText: string,
  fields: IFormField[]
}>()

const emit = defineEmits(['submit'])

const filteredFields = computed(() => props.fields.filter(el =>
  !el.reference || el.reference.every(el => !!formData[el])
))

const formData = reactive<{ [key: string]: string | number | boolean }>({})
props.fields.forEach(el => {
  if (el.value)
    formData[el.formField] = el.value
  else
    switch (el.type) {
      case 'text':
      case 'email':
      case 'date':
      case 'phone':
      case 'password': {
        formData[el.formField] = ''
        break
      }
      case 'select': {
        formData[el.formField] = 0
        break
      }
      case 'checkbox': {
        formData[el.formField] = false
        break
      }
      default: throw new Error('Invalid form field type: ' + el.type)
    }
})

const rules = reactive(Object.fromEntries(
  filteredFields.value
    .filter(el => !!el.validators)
    .map((el: IFormField) => [
      el.formField,
      el.validators
    ])
) as ValidationArgs)

const v$ = useVuelidate(rules, formData)

const onSubmit = (): void => {
  v$.value.$validate()
  if (!v$.value.$errors.length)
    emit('submit', formData)
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
