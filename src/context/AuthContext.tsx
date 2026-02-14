import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


interface AuthContextType {
  user: User | null;           // Firebase Auth යූසර් (UID, Email)
  userProfile: any | null;     // Firestore එකේ තියෙන අමතර විස්තර (Name, Phone)
  loading: boolean;            // දත්ත ලෝඩ් වෙනවාද කියා බැලීමට
  refreshProfile: () => Promise<void>; // ප්‍රොෆයිල් එක අප්ඩේට් කළාම දත්ත අලුත් කිරීමට
}

// Context එක නිර්මාණය කිරීම
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. AuthProvider Component එක
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Firestore එකෙන් යූසර්ගේ ප්‍රොෆයිල් දත්ත (Name, Phone ආදිය) ලබාගැනීම
  const fetchUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching profile in context:", error);
    }
  };

  useEffect(() => {
    // Firebase Auth ලෝඩ් වෙනවාද කියා බලන ලිස්නර් එක (Listener)
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      setUser(authenticatedUser);
      
      if (authenticatedUser) {
        // යූසර් ලොග් වෙලා නම් Firestore එකෙන් විස්තර ගමු
        await fetchUserProfile(authenticatedUser.uid);
      } else {
        // ලොග් අවුට් වෙලා නම් දත්ත ක්ලියර් කරමු
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe; // Cleanup listener when component unmounts
  }, []);

  // ප්‍රොෆයිල් එක අප්ඩේට් කළ පසුව දත්ත අලුත් කිරීමට අවශ්‍ය function එක
  const refreshProfile = async () => {
    if (user) {
        await fetchUserProfile(user.uid);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. යූස් කිරීමට ලේසි වීමට සාදන Custom Hook එක
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};