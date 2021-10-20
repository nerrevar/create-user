<template>
  <div
    v-if="result"
    class="result"
    v-html="result.replaceAll(',', '<br />')"
  />
  <CreateUserForm
    class="form"
    title="Создать пользователя"
    sendText="Создать"
    :fields="fields"
    :validations="validations"
    @submit="sendForm"
  >
    <Button
      label="Сгенерировать пароль"
      @click="generatePassword"
    />
  </CreateUserForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CreateUserForm, { IFormField } from '@/components/CreateUserForm.vue'
import { required, email } from '@vuelidate/validators'
import { v1 as uuid } from 'uuid'

const fields: IFormField[] = [
  {
    type: 'text',
    uuid: uuid(),
    formField: 'nickname',
    label: 'Nickname',
    required: true,
    placeholder: 'Nickname',
    validators: { required }
  },
  {
    type: 'email',
    uuid: uuid(),
    formField: 'email',
    label: 'Email',
    required: true,
    placeholder: 'email@example.com',
    validators: { required, email }
  },
  {
    type: 'date',
    uuid: uuid(),
    formField: 'birth_date',
    label: 'Date of birthday',
    required: false
  },
  {
    type: 'select',
    uuid: uuid(),
    formField: 'position_id',
    label: 'Position',
    required: false,
    placeholder: 'Select the position',
    options: [
      {
        id: 1,
        name: 'Administrator'
      },
      {
        id: 2,
        name: 'Software Engineer'
      },
      {
        id: 3,
        name: 'Content manager'
      }
    ]
  },
  {
    type: 'checkbox',
    uuid: uuid(),
    formField: 'is_admin',
    label: 'Is admin',
    required: false
  },
  {
    type: 'checkbox',
    uuid: uuid(),
    formField: 'user_rights[0]',
    label: 'Чтение',
    required: false,
    reference: ['Is admin'],
    disabled: true,
    value: true
  },
  {
    type: 'checkbox',
    uuid: uuid(),
    formField: 'user_rights[1]',
    label: 'Удаление',
    required: false,
    reference: ['Is admin'],
    value: false
  },
  {
    type: 'phone',
    uuid: uuid(),
    formField: 'phone',
    label: 'Phone number',
    required: false,
    placeholder: '+7 XXX XXX XX XX'
  },
  {
    type: 'password',
    uuid: uuid(),
    formField: 'password',
    label: 'Password',
    required: true,
    placeholder: 'Password',
    validators: { required }
  },
  {
    type: 'password',
    uuid: uuid(),
    formField: 'password_confirm',
    label: 'Confirm password',
    required: true,
    placeholder: 'Retype password',
    validators: { required }
  }
]
fields.forEach((el: IFormField) => {
  if (el.reference)
    el.reference =
      el.reference
        .map((el: string) =>
          fields.find((field: IFormField) => field.label === el)?.uuid
        )
        .filter((el: string | undefined) => !!el) as string[] | undefined
})

const result = ref('')

const sendForm = async (data: { [key: string]: string }): Promise<void> => {
  setTimeout(
    () => result.value = JSON.stringify(data),
    100
  )
  setTimeout(
    () => result.value = '',
    5000
  )
}

const generatePassword = (): void => {
  const password = btoa(String(10240 * Math.random())).slice(0, 12)
  fields
    .filter((el: IFormField) => el.type === 'password')
    .forEach((el: IFormField) => {
      el.value = password
      const element = document.getElementById(el.uuid)
      if (element) {
        element.setAttribute('value', password)
        const event = new Event('HTMLEvents')
        event.initEvent('change', false, true)
        element.dispatchEvent(event)
      }
    })
}
</script>
