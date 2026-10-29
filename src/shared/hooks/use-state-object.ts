import { useCallback, useState } from "react";

type Patch<T> = Partial<T> | ((prev: T) => Partial<T>);

/**
 * Объектное состояние и функция, которая сливает частичное обновление с текущим.
 */
export function useStateObject<T extends Record<string, unknown> = Record<string, unknown>>(
	initialState: T = {} as T,
): [T, (patch: Patch<T>) => void] {
	const [state, setState] = useState(initialState);
	const updateState = useCallback((patch: Patch<T>) => {
		setState((prev) => {
			const next = typeof patch === "function" ? patch(prev) : patch;
			return { ...prev, ...next };
		});
	}, []);
	return [state, updateState];
}
