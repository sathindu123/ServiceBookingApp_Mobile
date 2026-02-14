// import { createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth, db } from "../config/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";



// export const  login1 = async (
//     email: string, 
//     password: string
// ) => {
//    return await signInWithEmailAndPassword(auth, email, password);
// };


// export const registation = async (
//     fullName: string, 
//     email: string, 
//     password: string
// ) => {
    
//     console.log("AuthService - Name:", fullName);
//     console.log("AuthService - Email:", email);

   
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

    
//     await updateProfile(user, {
//         displayName: fullName
//     });

    
//     await setDoc(doc(db, "users", user.uid), {
//         name: fullName,
//         role: "user", 
//         email: email,
//         createdAt: new Date()
//     });

//     return userCredential;
// };

// export const logoutUser = async () => {
//     await signOut(auth);
//     AsyncStorage.clear();
//     return;
// }

// export const loginWithGoogle = async (idToken: string) => {
//   const credential = GoogleAuthProvider.credential(idToken);
//   return await signInWithCredential(auth, credential);
// };



import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider, 
  signInWithCredential 
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; // getDoc, updateDoc එකතු කළා
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Login
export const login1 = async (email: string, password: string) => {
   return await signInWithEmailAndPassword(auth, email.trim(), password);
};

// 2. Registration
export const registation = async (fullName: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullName });

    // Firestore එකේ user record එක හැදීම
    await setDoc(doc(db, "users", user.uid), {
        name: fullName,
        role: "user", 
        email: email.trim(),
        phone: "", // ආරම්භයේදී හිස්ව තබමු
        createdAt: new Date()
    });

    return userCredential;
};

// 3. Get User Profile (Read)
export const getUserProfile = async (uid: string) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        throw error;
    }
};

// 4. Update User Profile (Update)
export const updateUserProfile = async (uid: string, fullName: string, phone: string) => {
    try {
        const userRef = doc(db, "users", uid);
        
        // Firestore update කිරීම
        await updateDoc(userRef, {
            name: fullName,
            phone: phone
        });

        // Firebase Auth එකේ displayName එකත් update කිරීම
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: fullName });
        }
        return true;
    } catch (error) {
        throw error;
    }
};

// 5. Logout
export const logoutUser = async () => {
    await signOut(auth);
    await AsyncStorage.clear();
    return;
};

// 6. Google Login
export const loginWithGoogle = async (idToken: string) => {
  const credential = GoogleAuthProvider.credential(idToken);
  return await signInWithCredential(auth, credential);
};