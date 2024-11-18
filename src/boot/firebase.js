import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDzvQA56llksw5EGRK2UJMFudNMnA18nMw",
  authDomain: "todo-project-6f002.firebaseapp.com",
  databaseURL: "https://todo-project-6f002-default-rtdb.firebaseio.com",
  projectId: "todo-project-6f002",
  storageBucket: "todo-project-6f002.firebasestorage.app",
  messagingSenderId: "15177475463",
  appId: "1:15177475463:web:56e20b25c2e1ef19e19f22"
};

const app = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(app)
const firebaseDb = getDatabase(app)

export { app, firebaseAuth, firebaseDb }
