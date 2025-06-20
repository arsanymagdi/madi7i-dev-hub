
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, googleProvider, githubProvider, database } from '@/lib/firebase';
import { toast } from 'sonner';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  generateInitialsAvatar: (firstName: string, lastName: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const generateInitialsAvatar = (firstName: string, lastName: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 100, 100);
      gradient.addColorStop(0, '#8B5CF6');
      gradient.addColorStop(1, '#A855F7');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 100, 100);
      
      // Text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
      ctx.fillText(initials, 50, 50);
    }
    
    return canvas.toDataURL();
  };

  const saveUserData = async (user: User, additionalData?: { firstName: string; lastName: string }) => {
    const userRef = ref(database, `users/${user.uid}`);
    
    let firstName = '';
    let lastName = '';
    let photoURL = user.photoURL || '';
    
    if (additionalData) {
      firstName = additionalData.firstName;
      lastName = additionalData.lastName;
      photoURL = generateInitialsAvatar(firstName, lastName);
    } else if (user.displayName) {
      const nameParts = user.displayName.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts[nameParts.length - 1] || '';
    }
    
    const userData: UserData = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || `${firstName} ${lastName}`,
      photoURL,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    };
    
    await set(userRef, userData);
    setUserData(userData);
  };

  const fetchUserData = async (uid: string) => {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      setUserData(snapshot.val());
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserData(result.user.uid);
      toast.success('Successfully signed in!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile
      await updateProfile(result.user, {
        displayName: `${firstName} ${lastName}`,
      });
      
      await saveUserData(result.user, { firstName, lastName });
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user exists in database
      const userRef = ref(database, `users/${result.user.uid}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        await saveUserData(result.user);
      } else {
        setUserData(snapshot.val());
      }
      
      toast.success('Successfully signed in with Google!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      
      // Check if user exists in database
      const userRef = ref(database, `users/${result.user.uid}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        await saveUserData(result.user);
      } else {
        setUserData(snapshot.val());
      }
      
      toast.success('Successfully signed in with GitHub!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      toast.success('Successfully signed out!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userData,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGithub,
    logout,
    generateInitialsAvatar,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
