
import { ref, set, get, push, update, remove, onValue, off } from 'firebase/database';
import { database } from '@/lib/firebase';

export class DatabaseService {
  // Create or update data
  static async set(path: string, data: any) {
    try {
      const dbRef = ref(database, path);
      await set(dbRef, data);
      return { success: true };
    } catch (error) {
      console.error('Database set error:', error);
      return { success: false, error };
    }
  }

  // Get data once
  static async get(path: string) {
    try {
      const dbRef = ref(database, path);
      const snapshot = await get(dbRef);
      return { success: true, data: snapshot.val() };
    } catch (error) {
      console.error('Database get error:', error);
      return { success: false, error };
    }
  }

  // Add new data with auto-generated key
  static async push(path: string, data: any) {
    try {
      const dbRef = ref(database, path);
      const newRef = push(dbRef, data);
      return { success: true, key: newRef.key };
    } catch (error) {
      console.error('Database push error:', error);
      return { success: false, error };
    }
  }

  // Update specific fields
  static async update(path: string, updates: any) {
    try {
      const dbRef = ref(database, path);
      await update(dbRef, updates);
      return { success: true };
    } catch (error) {
      console.error('Database update error:', error);
      return { success: false, error };
    }
  }

  // Delete data
  static async remove(path: string) {
    try {
      const dbRef = ref(database, path);
      await remove(dbRef);
      return { success: true };
    } catch (error) {
      console.error('Database remove error:', error);
      return { success: false, error };
    }
  }

  // Listen to data changes
  static listen(path: string, callback: (data: any) => void) {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
      callback(snapshot.val());
    });
    return dbRef;
  }

  // Stop listening to data changes
  static stopListening(dbRef: any) {
    off(dbRef);
  }
}
