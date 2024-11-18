import Vue from 'vue'
import {uid, Notify} from 'quasar'
import {firebaseDb, firebaseAuth} from 'boot/firebase'
import {onValue, remove, update, set, ref, onChildAdded, onChildChanged, onChildRemoved} from "firebase/database";
import { showErrorMessage } from 'src/functions/function-show-error-message';


const state ={
    tasks : {
         /* "ID1":{
            name: "buy APPLE",
            completed: false,
            dueDate: "2021/05/12",
            dueTime: "10:30"
        },
        "ID2":{
            name: "complete code",
            completed: true,
            dueDate: "2021/07/12",
            dueTime: "12:30"
        },
        "ID3":{
            name: "buy banana",
            completed: false,
            dueDate: "2021/06/12",
            dueTime: "15:30"
        } */
    },
    search: '',
    sort: 'name',
    tasksDownloaded: false
}

const mutations = {
    updateTask(state, payload) {
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state, id){
        Vue.delete(state.tasks, id)
    },
    clearTasks(state){
        state.tasks = {}
    },
    addTask(state, payload){
        Vue.set(state.tasks, payload.id, payload.task)
    },
    setSearch(state, value){
        state.search = value
    },
    setSort(state, value){
        state.sort = value
    },
    setTasksDownloaded(state, value){
        state.tasksDownloaded = value
    }
}

const actions = {
    updateTask({ dispatch } , payload){
        dispatch('fbUpdateTask', payload)
    },
    deleteTask({ dispatch } , id){
        dispatch('fbDeleteTask', id)
    },
    addTask({dispatch}, task){
        let taskId = uid()
        let payload = {
            id: taskId,
            task: task
        }
        dispatch('fbAddData', payload)
    },
    setSearch({commit}, value){
        commit('setSearch', value)
    },
    setSort({commit}, value){
        commit('setSort', value)
    },
    fbReadData({commit}){
        let userId = firebaseAuth.currentUser.uid
        let userTasks = ref(firebaseDb, "tasks/" + userId)

        //initial check for data
        onValue(userTasks, snapshot => {
            commit('setTasksDownloaded', true)
        },
        { onlyOnce: true },
        error => {
            if (error){
                console.log('error message: ', error.message)
                showErrorMessage(error.message)
                this.$router.replace('/auth')
            }
        })

        onChildAdded(userTasks, (snapshot) =>{
            let task = snapshot.val()
            let payload ={
                id: snapshot.key,
                task: task
            }
            commit('addTask', payload)
        })

        onChildChanged(userTasks, (snapshot) =>{
            let task = snapshot.val()
            let payload ={
                id: snapshot.key,
                updates: task
            }
            commit('updateTask', payload)
        })

        onChildRemoved(userTasks, (snapshot) =>{
            let taskId = snapshot.key
            commit('deleteTask', taskId)
        })

    },
    fbAddData({}, payload){
        let userId = firebaseAuth.currentUser.uid
        let userTasks = ref(firebaseDb, "tasks/" + userId + "/" + payload.id)
        set(userTasks, payload.task, error => {
            if (error){
                showErrorMessage(error.message)
            }
        })
        Notify.create('Task added!')
    },
    fbUpdateTask({}, payload){
        let userId = firebaseAuth.currentUser.uid
        let userTasks = ref(firebaseDb, "tasks/" + userId + "/" + payload.id)
        update(userTasks, payload.updates, error => {
            if (error){
                showErrorMessage(error.message)
            }
        })
        let keys = Object.keys(payload.updates)
        if (!(keys.includes('completed') && keys.length == 1)){
            Notify.create('Task updated!')
        }
    },
    fbDeleteTask({}, taskId){
        let userId = firebaseAuth.currentUser.uid
        let userTasks = ref(firebaseDb, "tasks/" + userId + "/" + taskId)
        remove(userTasks, error => {
            if (error){
                showErrorMessage(error.message)
            }
        })
        Notify.create('Task deleted!')
    }
}

const getters = {
    tasksSorted: (state)=>{
        let tasksSorted={},
            keyOrdered = Object.keys(state.tasks)

        keyOrdered.sort((a,b)=> {
            let taskAProp = state.tasks[a][state.sort].toLowerCase(),
            taskBProp = state.tasks[b][state.sort].toLowerCase()

        if (taskAProp > taskBProp) return 1
        else if (taskAProp < taskBProp) return -1
        else return 0
        })

        keyOrdered.forEach((key) => {
            tasksSorted[key] = state.tasks[key]
        })
        return tasksSorted
    },
    tasksFiltered:(state, getters)=>{
        let tasksSorted = getters.tasksSorted,
        tasksFiltered ={}

        if (state.search){
            //populate empty object
            Object.keys(tasksSorted).forEach(function(key){
                let task = tasksSorted[key]
                if(task.name.toLowerCase().includes(state.search.toLowerCase())){
                    tasksFiltered[key] = task
                }
            })
            return tasksFiltered
        }
        return tasksSorted
    },
    tasksTodo: (state, getters) =>{
        let tasksFiltered = getters.tasksFiltered,
        tasks = {}

        Object.keys(tasksFiltered).forEach(function(key){
            let task = tasksFiltered[key]
            if(!task.completed){
                tasks[key] = task
            }
        })
        return tasks
    },
    tasksCompleted: (state, getters) =>{
        let tasksFiltered = getters.tasksFiltered,
        tasks = {}

        Object.keys(tasksFiltered).forEach(function(key){
            let task = tasksFiltered[key]
            if(task.completed){
                tasks[key] = task
            }
        })
        return tasks
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
