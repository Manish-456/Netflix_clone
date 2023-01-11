
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId:process.env.REACT_APP_PRODUCTID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDERID,
  appId:process.env.REACT_APP_APPID,
  measurementId:process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
export default app