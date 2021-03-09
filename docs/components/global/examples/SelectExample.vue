<template>
  <div class="space-y-2">
    <v-select v-model="value" :options="options" />
    <v-select v-model="templateValue" :options="templateOptions">
      <template #option="{ option }">
        <div class="flex items-center">
          <div class="bg-brand w-8 h-8 rounded" />
          <div class="text-sm ml-2">
            <div class="font-semibold">
              {{ option.label }}
            </div>
            <div class="text-secondary">
              {{ option.id }}
            </div>
          </div>
        </div>
      </template>
    </v-select>
    <v-select v-model="value" disabled :options="options" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: {},
      templateValue: {},
      templateOptions: [
        { id: 1, label: 'Option 1', value: 'option-1' },
        { id: 2, label: 'Option 2', value: 'option-2' },
        { id: 3, label: 'Option 3', value: 'option-3' }
      ],
      options: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Violet', value: 'violet' },
        { label: 'Yellow', value: 'yellow' }
      ]
    }
  }
}
</script>
