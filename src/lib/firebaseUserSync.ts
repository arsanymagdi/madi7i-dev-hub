import { onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "./firebase";

// Add user to /users in Realtime Database on login
onAuthStateChanged(auth, (user) => {
  if (user) {
    set(ref(database, `users/${user.uid}`), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split("@")[0] || "User",
    });
  }
});
