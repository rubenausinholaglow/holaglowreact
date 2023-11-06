import { Button } from 'designSystem/Buttons/Buttons';
import { ReactNode } from 'react';

const css = `
.modal {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
  position:  absolute;
  top: 70px;
  left: calc(25%);
  bottom: 70px;
}
`;
export default function HolaglowModal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: any;
}) {
  return (
    <div className="modal">
      <style>{css}</style>
      {children}

      <Button
        size="sm"
        type="secondary"
        isSubmit
        className="ml-2"
        onClick={onClose}
      >
        X
      </Button>
    </div>
  );
}
