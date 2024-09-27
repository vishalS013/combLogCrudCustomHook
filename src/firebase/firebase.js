import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdVIMW8q0xQZF0E9myi6xQLa8FyeMec2E",
  authDomain: "focupapp.firebaseapp.com",
  projectId: "focupapp",
  storageBucket: "focupapp.appspot.com",
  messagingSenderId: "871075626854",
  appId: "1:871075626854:web:7ea421b1aa5fcab7ca92a7",
  measurementId: "G-Y8KM2JPHMR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
