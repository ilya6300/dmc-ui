import { useCallback, useState } from "react";

type DisclosureOptions = {
	onOpen?: () => void;
	onClose?: () => void;
};

export type DisclosureHandlers = {
	open: () => void;
	close: () => void;
	toggle: () => void;
};

/**
 * Состояние открытия и обработчики open / close / toggle.
 * Колбэки вызываются только при реальной смене состояния.
 */
export function useDisclosure(
	initial = false,
	{ onOpen, onClose }: DisclosureOptions = {},
): [boolean, DisclosureHandlers] {
	const [opened, setOpened] = useState(initial);

	const open = useCallback(() => {
		setOpened((isOpened) => {
			if (isOpened) {
				return isOpened;
			}
			onOpen?.();
			return true;
		});
	}, [onOpen]);

	const close = useCallback(() => {
		setOpened((isOpened) => {
			if (!isOpened) {
				return isOpened;
			}
			onClose?.();
			return false;
		});
	}, [onClose]);

	const toggle = useCallback(() => {
		setOpened((isOpened) => {
			if (isOpened) {
				onClose?.();
				return false;
			}
			onOpen?.();
			return true;
		});
	}, [onOpen, onClose]);

	return [opened, { open, close, toggle }];
}
