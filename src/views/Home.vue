<template>
  <CreateUserForm
    class="form"
    title="Создать пользователя"
    sendText="Отправить"
    :fields="fields"
  />
</template>

<script lang="ts" setup>
import CreateUserForm, { IFormField } from '@/components/CreateUserForm.vue'
import { v1 as uuid } from 'uuid'

const fields: IFormField[] = [
  {
    type: 'text',
    uuid: uuid(),
    label: 'Nickname',
    required: true,
    placeholder: 'Nickname'
  },
  {
    type: 'email',
    uuid: uuid(),
    label: 'Email',
    required: true,
    placeholder: 'email@example.com'
  },
  {
    type: 'date',
    uuid: uuid(),
    label: 'Date of birthday',
    required: false
  },
  {
    type: 'select',
    uuid: uuid(),
    label: 'Position',
    required: false,
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
    label: 'Is admin',
    required: false
  },
  {
    type: 'checkbox',
    uuid: uuid(),
    label: 'Чтение',
    required: false,
    reference: ['Is admin'],
    disabled: true,
    value: true
  },
  {
    type: 'checkbox',
    uuid: uuid(),
    label: 'Удаление',
    required: false,
    reference: ['Is admin'],
    value: false
  },
  {
    type: 'phone',
    uuid: uuid(),
    label: 'Phone number',
    required: false
  },
  {
    type: 'password',
    uuid: uuid(),
    label: 'Password',
    required: true
  },
  {
    type: 'password',
    uuid: uuid(),
    label: 'Confirm password',
    required: true
  }
]
</script>
