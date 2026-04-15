-- Migration number: 0001 	 2026-04-15T02:43:30.096Z
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT (strftime ('%Y-%m-%dT%H:%M:%SZ', 'now')),
  rating REAL NOT NULL,
  role TEXT DEFAULT 'guest' NOT NULL
);

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  created_at TEXT DEFAULT (strftime ('%Y-%m-%dT%H:%M:%SZ', 'now')) NOT NULL,
  expires_at TEXT DEFAULT (strftime ('%Y-%m-%dT%H:%M:%SZ', 'now', '+1 year')) NOT NULL
);
