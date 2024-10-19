<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title class="absolute-center">
          ToDo App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab v-for="nav in navs" :key="nav.label" :icon="nav.icon" :label="nav.label" :to="nav.to" />
      </q-tabs>
    </q-footer>

    <q-drawer
        v-model="leftDrawerOpen"
        :breakpoint="767"
        :width="250"
        bordered
        content-class="bg-primary">
      <q-list dark>
        <q-item-label header>
          Navigation
        </q-item-label>

        <q-item
            v-for="nav in navs"
            exact
            :to="nav.to"
            :key="nav.label"
            class="text-grey-4"
            clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: 'ToDo',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
    color: white !important;
  }
  }

</style>
