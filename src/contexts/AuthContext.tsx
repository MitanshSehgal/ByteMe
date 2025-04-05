import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUser, getUserByEmail } from '../services/storage';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    const existingUser = await getUserByEmail(email);
    
    if (!existingUser || existingUser.password !== hashedPassword) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = existingUser;
    setUser(userWithoutPassword);
  };

  const signUp = async (email: string, password: string) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({
      email,
      password: hashedPassword,
      fullName: '',
      learningStreak: 0,
      experiencePoints: 0,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}