import { auth } from "../../firebase";
import { getIdToken } from "firebase/auth";

export const sendTokenToBackend = async () => {
  const user = auth.currentUser;

  if (user) {
    const token = await getIdToken(user);
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: token }),
    });

    const data = await response.json();
    if (data.message === "認証成功") {
      console.log("ユーザー認証成功:", data.uid);
    } else {
      console.error("ユーザー認証失敗");
    }
  } else {
    console.error("ユーザーが認証されていません");
  }
};
