import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const FirebaseLoginToken = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    return idToken;
};

export { FirebaseLoginToken };