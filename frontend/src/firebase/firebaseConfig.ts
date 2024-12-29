import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyAaIZNZn9EG6ZZlVFpAVTDDpu52CDnEw-I",
  authDomain: "finalprojectteama.firebaseapp.com",
  projectId: "finalprojectteama",
  storageBucket: "finalprojectteama.appspot.com",
  messagingSenderId: "1089782968455",
  appId: "1:1089782968455:web:d85b322b555b1903fb4822",
  measurementId: "G-59G4QGYVMN"
};

// アプリが初期化されていなければ初期化
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 認証モジュールをエクスポート
export const auth = getAuth();

export default app;