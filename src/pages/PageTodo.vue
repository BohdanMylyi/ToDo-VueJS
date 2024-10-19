<template>
  <q-page class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>

      <q-item v-ripple v-for="task in tasks" :key="task.id" @click="task.completed = !task.completed"
        :class="!task.completed ? 'bg-blue-grey-2' : 'bg-green-3'" clickable>
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough': task.completed }">
            {{ task.name }}
          </q-item-label>

        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column">
              <q-icon name="event" size="18px" class="q-mr-xs"></q-icon>
            </div>
            <div class="column">
              <q-item-label caption class="row justify-end">{{ task.dueDate }}
              </q-item-label>
              <small class="row justify-end">{{ task.dueTime }}</small>
            </div>
          </div>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: 'Go to shop',
          completed: false,
          dueDate: '2019/04/15',
          dueTime: '12:40'
        },
        {
          id: 2,
          name: 'Bananas',
          completed: false,
          dueDate: '2023/02/15',
          dueTime: '14:10'
        },
        {
          id: 3,
          name: 'Apples',
          completed: false,
          dueDate: '2031/02/11',
          dueTime: '11:10'
        }
      ]
    }
  }
}
</script>
