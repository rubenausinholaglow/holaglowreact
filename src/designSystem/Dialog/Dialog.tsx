import { ReactNode } from 'react';
import * as DialogModal from '@radix-ui/react-dialog';
import { gtUltra, poppins } from 'app/fonts';
import { SvgCross } from 'app/icons/IconsDs';

export function Dialog({ children }: { children: ReactNode }) {
  return <DialogModal.Root>{children}</DialogModal.Root>;
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  return (
    <DialogModal.Trigger className={poppins.className}>
      {children}
    </DialogModal.Trigger>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <DialogModal.Portal>
      <DialogModal.Overlay className="bg-white/50 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
      <DialogModal.Content
        className={`${poppins.className} ${gtUltra.variable} data-[state=open]:animate-contentShow fixed right-0 bottom-0 bg-derma-secondary100 z-50 shadow-centered-black overflow-y-auto top-0 border-l border-derma-secondary100 ${className}`}
      >
        {children}
        <DialogModal.Close asChild>
          <SvgCross
            className="fixed cursor-pointer top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          />
        </DialogModal.Close>
      </DialogModal.Content>
    </DialogModal.Portal>
  );
}
