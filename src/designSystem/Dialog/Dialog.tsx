import { ReactNode, useRef, useState } from 'react';
import * as DialogModal from '@radix-ui/react-dialog';
import CheckHydration from '@utils/CheckHydration';
import { gtUltra, poppins } from 'app/fonts';
import { SvgCross } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { twMerge } from 'tailwind-merge';

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
  dragToClose = false,
  modalVisibility,
  setModalVisibility,
}: {
  type?: 'default' | 'bottom';
  children: ReactNode;
  className?: string;
  hideClose?: boolean;
  dragToClose?: boolean;
  modalVisibility?: boolean;
  setModalVisibility?: (value: boolean) => void;
}) {
  const animationStyles =
    type === 'default'
      ? 'data-[state=open]:animate-contentShow top-0 bottom-0'
      : 'data-[state=open]:animate-contentShowBottom top-auto left-0 right-0 bottom-0';

  const [deltaYScroll, setDeltaYScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const modalRef = useRef(null);

  const handleTouchStart = (e: any) => {
    if (!modalVisibility) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;

    const deltaY = e.touches[0].clientY - startY;
    setDeltaYScroll(deltaY);

    if (modalRef.current) {
      if (deltaY > 0) {
        (
          modalRef.current as HTMLDivElement
        ).style.transform = `translateY(${deltaY}px)`;
      }
    }

    if (deltaY > 150) {
      setIsDragging(false);
      if (setModalVisibility) setModalVisibility(false);
    }
  };

  const handleTouchEnd = (e: any) => {
    setIsDragging(false);
    if (deltaYScroll < 150 && modalRef.current) {
      (modalRef.current as HTMLDivElement).style.transform = 'translateY(0)';
    }
  };

  return (
    <DialogModal.Portal>
      <DialogModal.Overlay className="bg-hg-black/20 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
      <DialogModal.Content
        className={twMerge(
          `${poppins.className} ${gtUltra.variable} ${animationStyles} fixed z-50 shadow-centered-black overflow-y-auto border-l border-derma-secondary100 ${className}`
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={modalRef}
      >
        <div className="sticky flex top-0 justify-end z-50">
          {!hideClose && !dragToClose && (
            <DialogModal.Close asChild className="modal-close">
              <SvgCross
                className="absolute mt-4 mr-4 cursor-pointer h-5 w-5 appearance-none"
                aria-label="Close"
              />
            </DialogModal.Close>
          )}
        </div>
        {dragToClose && (
          <Flex className="w-full p-4 justify-center">
            <div className="h-1.5 bg-hg-black300/50 rounded-full w-20 cursor-pointer" />
          </Flex>
        )}
        {children}
      </DialogModal.Content>
    </DialogModal.Portal>
  );
}
