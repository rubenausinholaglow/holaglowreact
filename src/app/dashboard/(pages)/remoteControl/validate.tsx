'use client';
import { useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function ValidateComment() {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleClick = async () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = async () => {
    setIsCommentModalOpen(false);
    /* const result = await ScheduleService.finish(
      appointmentId ?? '',
      comment ?? '',
      userId || ''
    );
    if (result) {
      clearLocalStorage(false);
      router.push('/dashboard');
    } else {
      //TODO - MESSAGE!
    }*/
  };

  return (
    <>
      {!isCommentModalOpen && (
        <Flex layout="col-center" className="mt-8">
          <Button isSubmit onClick={handleClick} type="secondary">
            Validar Cita
          </Button>
        </Flex>
      )}
      {isCommentModalOpen && (
        <Flex layout="col-center" className="mt-8">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full h-40 p-2 resize-none border rounded-lg"
          />

          <Button
            isSubmit
            onClick={handleCommentSubmit}
            type="secondary"
            className="mt-4"
          >
            Validar Cita
          </Button>
          <Button
            onClick={() => setIsCommentModalOpen(false)}
            type="secondary"
            className="mt-4"
          >
            Cancelar
          </Button>
        </Flex>
      )}
    </>
  );
}
