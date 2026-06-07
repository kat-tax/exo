import type { Evolu } from "@evolu/common";

/**
 * Standalone utility for periodically exporting an Evolu SQLite database
 * to the user's filesystem via the File System Access API.
 */
export interface BackupOptions {
  /** Interval between writes in milliseconds. @default 15_000 // (15 seconds) */
  intervalMs?: number;
  /** Suggested filename shown in the save dialog. @default 'evolu.db' */
  suggestedName?: string;
  /** When true, the backup is skipped if the database has not changed. @default true */
  checkHash?: boolean;
  /** Called after each successful write with byte count. */
  onWrite?: (bytes: number) => void;
  /** Called when a write fails. */
  onError?: (error: unknown) => void;
}

/**
 * Prompts the user to choose a save location, immediately writes the
 * current Evolu database, then continues writing on the given interval.
 * @returns a cleanup function that stops the interval.
 */
export async function startEvoluBackup(evolu: Evolu, {
  suggestedName = "evolu.db",
  intervalMs = 15_000,
  checkHash = true,
  onWrite,
  onError,
}: BackupOptions): Promise<() => void> {
  const handle = await pickFileHandle(suggestedName);
  let lastHash: string | null = null;
  const backup = async () => {
    try {
      const database = await evolu.exportDatabase();
      if (checkHash) {
        const hash = await hashDatabase(database);
        if (hash === lastHash) return;
        lastHash = hash;
      }
      const writable = await (handle as any).createWritable();
      await writable.write(database);
      await writable.close();
      onWrite?.(database.byteLength);
    } catch (err) {
      onError?.(err);
    }
  };
  await backup();
  const id = setInterval(backup, intervalMs);
  return () => clearInterval(id);
}

/**
 * Prompts the user to choose a save location via the File System Access API.
 * @param suggestedName - The suggested filename to show in the save dialog.
 * @returns the file handle to the chosen save location.
 */
async function pickFileHandle(suggestedName: string): Promise<FileSystemFileHandle> {
  if (!("showSaveFilePicker" in window)) {
    throw new Error("File System Access API is not supported in this browser.");
  }
  return await (window as any).showSaveFilePicker({
    suggestedName,
    types: [{
      description: "Evolu SQLite Database",
      accept: { "application/x-sqlite3": [".sqlite3", ".sqlite", ".db"] },
    }],
  });
}

/**
 * Hashes the given database using SHA-1.
 * @param data - The database to hash.
 * @returns the SHA-1 hash of the database as hex digest.
 */
async function hashDatabase(data: Uint8Array<ArrayBuffer>): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-1', data.buffer)
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
