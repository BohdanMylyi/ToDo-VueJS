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

const mutations = {};

const actions = {};

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
