import { useCallback, useSyncExternalStore, type ReactNode } from "react";

type Listener = () => void;

type SlotEntry = {
  node: ReactNode;
  key: string;
  owner: string;
};

const slots: Record<string, SlotEntry | undefined> = {};
const slotListeners = new Map<string, Set<Listener>>();
const versionListeners = new Set<Listener>();
let version = 0;

function emitSlot(name: string) {
  const set = slotListeners.get(name);
  if (!set) return;
  for (const listener of set) {
    listener();
  }
}

function emitVersion() {
  version += 1;
  for (const listener of versionListeners) {
    listener();
  }
}

export const templateStore = {
  subscribe(name: string, listener: Listener) {
    let set = slotListeners.get(name);
    if (!set) {
      set = new Set();
      slotListeners.set(name, set);
    }
    set.add(listener);
    return () => {
      set.delete(listener);
      if (set.size === 0) {
        slotListeners.delete(name);
      }
    };
  },
  subscribeVersion(listener: Listener) {
    versionListeners.add(listener);
    return () => {
      versionListeners.delete(listener);
    };
  },
  getVersion() {
    return version;
  },
  getSlot(name: string) {
    return slots[name]?.node;
  },
  register(name: string, element: ReactNode, contentKey: string, owner: string) {
    const prev = slots[name];
    if (prev && prev.owner === owner && prev.key === contentKey) {
      return;
    }
    slots[name] = { node: element, key: contentKey, owner };
    emitSlot(name);
    emitVersion();
  },
  unregister(name: string, owner: string) {
    const prev = slots[name];
    if (!prev || prev.owner !== owner) {
      return;
    }
    delete slots[name];
    emitSlot(name);
    emitVersion();
  },
};

export function useTemplateSlot(name: string) {
  const subscribe = useCallback(
    (listener: Listener) => templateStore.subscribe(name, listener),
    [name],
  );
  const getSnapshot = useCallback(() => templateStore.getSlot(name), [name]);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useTemplateVersion() {
  return useSyncExternalStore(
    templateStore.subscribeVersion,
    templateStore.getVersion,
    templateStore.getVersion,
  );
}
