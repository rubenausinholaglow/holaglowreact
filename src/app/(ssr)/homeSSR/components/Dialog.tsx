import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function DialogTrigger({ children }: { children: ReactNode }) {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
}

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-hg-black/50 z-40 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function DialogClose({ children }: { children: ReactNode }) {
  return <Dialog.Close>{children}</Dialog.Close>;
}

export function DialogWrapper({ children }: { children: ReactNode }) {
  return <Dialog.Root>{children}</Dialog.Root>;
}
