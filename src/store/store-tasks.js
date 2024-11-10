import Vue from 'vue'

const state = {
  tasks: {
    'ID1': {
      name: "Go to shop",
      completed: false,
      dueDate: "2019/04/15",
      dueTime: "12:40",
    },
    'ID2': {
      name: "Bananas",
      completed: false,
      dueDate: "2023/02/15",
      dueTime: "14:10",
    },
    'ID3': {
      name: "Apples",
      completed: false,
      dueDate: "2031/02/11",
      dueTime: "11:10",
    }
  }
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    console.log('deleted id:', id);
    Vue.delete(state.tasks, id)
  }
};

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask( {commit}, id) {
    commit('deleteTask', id)
  }
};

const getters = {
  tasks: (state) => {
    return state.tasks
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
