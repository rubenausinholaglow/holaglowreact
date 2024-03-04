import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

export function DialogTrigger({ children }: { children: ReactNode }) {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
}

export function DialogContent({
  animation = 'left',
  className = '',
  children,
}: {
  animation?: 'left' | 'bottom' | 'center';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-hg-black/50 z-40 data-[state=open]:animate-overlayShow fixed inset-0" />

      {animation === 'left' && (
        <Dialog.Content
          className={twMerge(
            `z-40 data-[state=open]:animate-contentShowLeft fixed inset-0 h-screen w-screen bg-white focus:outline-none ${className}`
          )}
        >
          {children}
        </Dialog.Content>
      )}

      {animation === 'bottom' && (
        <Dialog.Content
          className={twMerge(
            `z-40 data-[state=open]:animate-contentShowBottom fixed inset-0 h-screen w-screen bg-white focus:outline-none ${className}`
          )}
        >
          <div className="w-[72px] h-[6px] rounded-full bg-hg-black100 mx-auto my-4" />
          {children}
        </Dialog.Content>
      )}

      {animation === 'center' && (
        <Dialog.Content
          className={twMerge(
            `z-40 data-[state=open]:animate-contentShowCenter fixed inset-0 h-screen w-screen bg-white focus:outline-none ${className}`
          )}
        >
          {children}
        </Dialog.Content>
      )}
    </Dialog.Portal>
  );
}

export function DialogClose({ children }: { children: ReactNode }) {
  return <Dialog.Close>{children}</Dialog.Close>;
}

export function DialogWrapper({ children }: { children: ReactNode }) {
  return <Dialog.Root>{children}</Dialog.Root>;
}
