'use client';

import { ReactNode, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function DialogTrigger({ children }: { children: ReactNode }) {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
}

export function DialogContent({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialogContent = document.querySelector('.Dialog.Content')!;

    // Define a MutationObserver to track changes to the data-state attribute
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-state'
        ) {
          const newState = dialogContent.getAttribute('data-state') === 'open';
          setIsOpen(newState);
        }
      }
    });

    // Start observing changes to the data-state attribute
    observer.observe(dialogContent, { attributes: true });

    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, []);

  console.log(isOpen);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-hg-black/50 z-40 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="transition-all z-40 translate-x-[105%] data-[state=open]:translate-x-[50%] fixed inset-0 h-screen w-screen bg-white focus:outline-none">
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
