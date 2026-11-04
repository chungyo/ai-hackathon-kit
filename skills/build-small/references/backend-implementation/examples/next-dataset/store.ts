import { DatabaseSync } from 'node:sqlite';

// Local learning example only: synchronous SQLite, small synthetic datasets.
// The caller supplies a test DB path; no production database or credentials.
export type Item = { id: string; value: number };

function openDatabase(path: string): DatabaseSync {
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA busy_timeout = 1000;
    CREATE TABLE IF NOT EXISTS datasets (
      version INTEGER PRIMARY KEY AUTOINCREMENT,
      dataset_id TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS items (
      dataset_version INTEGER NOT NULL REFERENCES datasets(version),
      id TEXT NOT NULL,
      value INTEGER NOT NULL,
      PRIMARY KEY (dataset_version, id)
    );
    CREATE TABLE IF NOT EXISTS state (
      singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
      active_version INTEGER REFERENCES datasets(version)
    );
    INSERT OR IGNORE INTO state(singleton, active_version) VALUES (1, NULL);
    CREATE TABLE IF NOT EXISTS results (
      dataset_version INTEGER PRIMARY KEY REFERENCES datasets(version),
      total INTEGER NOT NULL
    );
  `);
  return db;
}

export function applyDataset(path: string, datasetId: string, items: Item[]): number {
  const db = openDatabase(path);
  try {
    db.exec('BEGIN IMMEDIATE');
    try {
      const inserted = db.prepare('INSERT INTO datasets(dataset_id) VALUES (?)').run(datasetId);
      const version = Number(inserted.lastInsertRowid);
      const insertItem = db.prepare('INSERT INTO items(dataset_version, id, value) VALUES (?, ?, ?)');
      for (const item of items) insertItem.run(version, item.id, item.value);
      db.prepare('UPDATE state SET active_version = ? WHERE singleton = 1').run(version);
      db.exec('COMMIT');
      return version;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  } finally {
    db.close();
  }
}

export function calculateActive(path: string): boolean {
  const db = openDatabase(path);
  try {
    // The example holds the write transaction only for its small local calculation.
    db.exec('BEGIN IMMEDIATE');
    try {
      const state = db.prepare('SELECT active_version FROM state WHERE singleton = 1').get() as { active_version: number | null };
      if (state.active_version === null) {
        db.exec('ROLLBACK');
        return false;
      }
      const rows = db.prepare('SELECT value FROM items WHERE dataset_version = ?').all(state.active_version) as { value: number }[];
      const total = rows.reduce((sum, row) => sum + row.value, 0);
      if (!Number.isSafeInteger(total)) throw new Error('Unsafe result');
      db.prepare('INSERT OR REPLACE INTO results(dataset_version, total) VALUES (?, ?)').run(state.active_version, total);
      db.exec('COMMIT');
      return true;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  } finally {
    db.close();
  }
}

export function getStatus(path: string): { datasetId: string | null; version: number | null; total: number | null; status: string } {
  const db = openDatabase(path);
  try {
    const row = db.prepare(`
      SELECT d.dataset_id, d.version, r.total
      FROM state s
      LEFT JOIN datasets d ON d.version = s.active_version
      LEFT JOIN results r ON r.dataset_version = s.active_version
      WHERE s.singleton = 1
    `).get() as { dataset_id: string | null; version: number | null; total: number | null };
    return {
      datasetId: row.dataset_id,
      version: row.version,
      total: row.total,
      status: row.version === null ? 'no-dataset' : row.total === null ? 'needs-calculation' : 'ready',
    };
  } finally {
    db.close();
  }
}
