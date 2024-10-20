<template>
  <q-item v-ripple @click="task.completed = !task.completed"
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
</template>


<script>
  export default {
    props: ['task', 'id']
  }
</script>


<style></style>
