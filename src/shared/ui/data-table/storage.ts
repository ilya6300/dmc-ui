export type DataTableStorage = {
  getItem: (key: string) => unknown;
  setItem: (key: string, value: unknown) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

export function createTableStorage(storageKey: string): DataTableStorage {
  const prefix = `${storageKey}.`;
  return {
    clear() {
      const keys: string[] = [];
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith(prefix)) keys.push(key);
      }
      for (const key of keys) localStorage.removeItem(key);
    },
    setItem(key, value) {
      localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
    },
    getItem(key) {
      const value = localStorage.getItem(`${prefix}${key}`);
      if (!value) return null;
      try {
        return JSON.parse(value) as unknown;
      } catch {
        return null;
      }
    },
    removeItem(key) {
      localStorage.removeItem(`${prefix}${key}`);
    },
  };
}

export function readStored<T>(storage: DataTableStorage | undefined, key: string, fallback: T): T {
  if (!storage) return fallback;
  const value = storage.getItem(key);
  return value == null ? fallback : (value as T);
}
