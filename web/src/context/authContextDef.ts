import { createContext } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { UserProfileResponse } from '../types/api';

export interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfileResponse | null;
  loading: boolean;
  profileLoading: boolean;
  error: string | null;
  isFirebaseConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
