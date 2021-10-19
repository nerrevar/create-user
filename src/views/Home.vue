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
    label: 'nickname'
  }
]
</script>
