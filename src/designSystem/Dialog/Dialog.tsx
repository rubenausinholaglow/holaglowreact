import { ReactNode } from 'react';
import * as DialogModal from '@radix-ui/react-dialog';
import CheckHydration from '@utils/CheckHydration';
import { gtUltra, poppins } from 'app/fonts';
import { SvgCross } from 'app/icons/IconsDs';

export function Dialog({
  open,
  onOpenChange,
  dragToClose = false,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dragToClose?: boolean;
  children: ReactNode;
}) {
  return (
    <CheckHydration>
      <DialogModal.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </DialogModal.Root>
    </CheckHydration>
  );
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  return (
    <DialogModal.Trigger className={poppins.className}>
      {children}
    </DialogModal.Trigger>
  );
}

export function DialogContent({
  type = 'default',
  children,
  className,
  hideClose = false,
}: {
  type?: 'default' | 'bottom';
  children: ReactNode;
  className?: string;
  hideClose?: boolean;
}) {
  const animationStyles =
    type === 'default'
      ? 'data-[state=open]:animate-contentShow top-0 bottom-0'
      : 'data-[state=open]:animate-contentShowBottom top-auto left-0 right-0 bottom-0';

  return (
    <DialogModal.Portal>
      <DialogModal.Overlay className="bg-white/50 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
      <DialogModal.Content
        className={`${poppins.className} ${gtUltra.variable} ${animationStyles} fixed bg-derma-secondary100 z-50 shadow-centered-black overflow-y-auto top-0 border-l border-derma-secondary100 ${className}`}
      >
        <div className="sticky flex top-0 justify-end z-50">
          {!hideClose && (
            <DialogModal.Close asChild className="modal-close">
              <SvgCross
                className="absolute mt-4 mr-4 cursor-pointer h-6 w-6 appearance-none"
                aria-label="Close"
              />
            </DialogModal.Close>
          )}
        </div>
        {children}
      </DialogModal.Content>
    </DialogModal.Portal>
  );
}
