export const validationProps = () => {
  return {
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      const forbiddenKeys = ['e', 'E', '+', '-', ',', '.', 'ArrowUp', 'ArrowDown'];
      if (forbiddenKeys.includes(e.key)) {
        e.preventDefault();
      }
    },
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onContextMenu: (e: React.MouseEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
    onWheel: (e: React.WheelEvent<HTMLInputElement>) => {
      if (e.target instanceof HTMLElement) {
        e.target.blur();
      }
    },
    autoComplete: 'off',
  };
};
