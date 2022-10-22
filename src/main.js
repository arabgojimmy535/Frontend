import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/estilos.css'
import '/node_modules/bootstrap/css/bootstrap.min.css'
import '/node_modules/bootstrap/js/bootstrap.bundle'

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbQn-_iIIde4qcWhKqeS3DwPffi1-CIsQ",
  authDomain: "vehiculos-3ae92.firebaseapp.com",
  projectId: "vehiculos-3ae92",
  storageBucket: "vehiculos-3ae92.appspot.com",
  messagingSenderId: "411199960636",
  appId: "1:411199960636:web:6dcaee2c16bf9654dff539"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

createApp(App).use(router).mount('#app')

