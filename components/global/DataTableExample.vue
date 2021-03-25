<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.name"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ column.name }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, i) in rows" :key="i">
                <td
                  v-for="(column, index) in columns"
                  :key="index"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <slot
                    :name="`column-${column.name}`"
                    :value="row[column.name]"
                    :row="row"
                  >
                    {{ row[column.name] }}
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { name: 'person', label: 'Name' },
        { name: 'status', label: 'Status' },
      ],
      rows: [
        { person: 'Carson Bain', title: 'Developer', status: 'Declined' },
        { person: 'John Doe', title: 'Customer Service', status: 'Declined' },
        { person: 'Jane Doe', title: 'CEO', status: 'Declined' },
      ],
    }
  },
  // props: {
  //   columns: {
  //     type: Array,
  //     required: true,
  //   },
  //   rows: {
  //     type: Array,
  //     required: true,
  //   },
  // },
}
</script>
