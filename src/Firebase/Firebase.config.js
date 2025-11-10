// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnkcZLx0kLbh61V9dqqn2oMN3ZKsioSNg",
  authDomain: "utility-bill-management-c718d.firebaseapp.com",
  projectId: "utility-bill-management-c718d",
  storageBucket: "utility-bill-management-c718d.firebasestorage.app",
  messagingSenderId: "1007467154881",
  appId: "1:1007467154881:web:be3ec760271809f435f340"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;