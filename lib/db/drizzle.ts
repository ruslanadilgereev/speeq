import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization to avoid build-time errors when POSTGRES_URL is not set
let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getClient() {
  if (!_client) {
    const url = process.env.POSTGRES_URL;
    if (!url) {
      throw new Error('POSTGRES_URL environment variable is not set');
    }
    _client = postgres(url);
  }
  return _client;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getClient(), { schema });
  }
  return _db;
}

// Export a getter function that lazily initializes the db
export function getDatabase() {
  return getDb();
}

// For backwards compatibility, export db as a proxy that lazily initializes
// This allows imports like `import { db } from '@/lib/db/drizzle'` to work
// without throwing at import time
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    const database = getDb();
    const value = (database as any)[prop];
    if (typeof value === 'function') {
      return value.bind(database);
    }
    return value;
  }
});

export const client = new Proxy({} as ReturnType<typeof postgres>, {
  get(_, prop) {
    const c = getClient();
    const value = (c as any)[prop];
    if (typeof value === 'function') {
      return value.bind(c);
    }
    return value;
  }
});
