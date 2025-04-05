import { openDB, DBSchema } from 'idb';

interface User {
  id: string;
  email: string;
  fullName: string;
  password?: string;
  learningStreak: number;
  experiencePoints: number;
}

interface ByteMeDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
}

const DB_NAME = 'byteme-db';
const DB_VERSION = 1;

let db = null;

export async function initDB() {
  return await openDB<ByteMeDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const userStore = db.createObjectStore('users', { keyPath: 'id' });
      userStore.createIndex('by-email', 'email', { unique: true });
    },
  });
}

export async function getDB() {
  if (!db) {
    db = await initDB();
  }
  return db;
}

export async function createUser(user: Omit<User, 'id'>) {
  const db = await getDB();
  const id = crypto.randomUUID();
  const newUser = { ...user, id };
  await db.put('users', newUser);
  return newUser;
}

export async function getUserByEmail(email: string) {
  const db = await getDB();
  return db.getFromIndex('users', 'by-email', email);
}