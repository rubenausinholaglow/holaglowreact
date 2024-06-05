'use client';
import React, { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';

interface BudgetDetailsProps {
  params: { id: string };
}

export default function BudgetDetailPage({ params }: BudgetDetailsProps) {
  const [budgetDetail, setBudgetDetail] = useState<Budget | undefined>(
    undefined
  );
  const [statusText, setStatusText] = useState<string>('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [comment, setComment] = useState('');

  async function getBudget() {
    setBudgetDetail(undefined);
    budgetService.getBudget(params.id).then(x => {
      setBudgetDetail(x);
      let statusText = 'Pendiente';
      if (x?.statusBudget == 3) {
        statusText = 'Rechazado';
      }
      if (x?.statusBudget == 4) {
        statusText = 'Pagado';
      }
      setStatusText(statusText);
    });
  }
  useEffect(() => {
    getBudget();
  }, []);

  if (!budgetDetail) {
    return (
      <>
        <MainLayoutCRM>
          <ContainerCRM>Cargando presupuesto...</ContainerCRM>
        </MainLayoutCRM>
      </>
    );
  }
  async function setBudgetStatus(status: string) {
    await budgetService.updateStatus(budgetDetail!.id!, status);
    getBudget();
    setShowStatusModal(false);
  }

  async function saveBudgetComment() {
    if (commentId) {
      await budgetService.updateComment(commentId, comment);
    } else {
      await budgetService.addComment(budgetDetail!.id!, comment);
    }
    getBudget();
    setComment('');
    setCommentId('');
    setShowCommentModal(false);
  }

  return (
    <>
      <MainLayoutCRM>
        <ContainerCRM>
          <div className="p-4">
            <label>Fecha: </label>
            <label>
              {dayjs(budgetDetail?.creationDate).format('YYYY-MM-DD')}
            </label>
          </div>
          <div className="p-4">
            <label>Paciente: </label>
            <label>
              {budgetDetail?.user!.firstName +
                ' ' +
                budgetDetail?.user!.lastName +
                ' ' +
                budgetDetail?.user!.secondLastName}
            </label>
          </div>
          <div className="p-4">
            <label>Telefono: </label>
            <label>{budgetDetail?.user!.phone}</label>
          </div>
          <div className="p-4">
            <label>Comercial: </label>
            <label>{budgetDetail?.professional!.name}</label>
          </div>
          <div className="p-4">
            <label>Importe: </label>
            <label>{budgetDetail?.totalPrice}€</label>
          </div>
          <div className="p-4">
            <label>Servicios: </label>
            <div className="p-4">
              <>{budgetDetail?.products.map(x => <>{x.product?.title}</>)}</>
            </div>
          </div>
          <div className="p-4">
            <label>Estado: </label>
            <div
              className="flex justify-center items-center bg-hg-primary rounded-full p-1 px-2"
              onClick={() => setShowStatusModal(true)}
            >
              <label>{statusText}</label>
            </div>
          </div>
          <div className="p-4">
            <label>Comentarios: </label>
            <div className="p-4">
              <>
                {budgetDetail?.budgetComments!.map(x => (
                  <div key={x.id}>
                    {x.comment}

                    <Button
                      className="cursor-pointer"
                      type={'primary'}
                      onClick={() => {
                        setShowCommentModal(true);
                        setCommentId(x.id);
                        setComment(x.comment);
                      }}
                    >
                      Editar comentario
                    </Button>
                  </div>
                ))}
              </>
            </div>
          </div>
          <Button
            className="cursor-pointer"
            type={'primary'}
            onClick={() => {
              setShowCommentModal(true);
              setCommentId('');
              setComment('');
            }}
          >
            Añadir comentario
          </Button>
          <Modal
            type="center"
            height="h-auto"
            width="w-full"
            className="max-w-sm mx-auto"
            isVisible={showStatusModal}
            avoidClosing={false}
          >
            <Flex layout="col-center" className="p-4">
              <Title className="mb-6">Modificar estado</Title>

              <Button
                className="cursor-pointer"
                type={'primary'}
                onClick={() => {
                  setBudgetStatus('1');
                }}
              >
                Pendiente
              </Button>
              <Button
                className="cursor-pointer"
                type={'primary'}
                onClick={() => {
                  setBudgetStatus('3');
                }}
              >
                Rechazado
              </Button>
              <Button
                className="cursor-pointer"
                type={'primary'}
                onClick={() => {
                  setBudgetStatus('4');
                }}
              >
                Pagado
              </Button>
            </Flex>
          </Modal>
          <Modal
            type="center"
            height="h-auto"
            width="w-full"
            className="max-w-sm mx-auto"
            isVisible={showCommentModal}
            avoidClosing={false}
          >
            <Flex layout="col-center" className="p-4">
              <Title className="mb-6">Añadir comentario</Title>

              <Flex layout="col-left" className="gap-4 w-full mb-8">
                <TextInputField
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                />
              </Flex>
              <Flex layout="col-right" className="w-full">
                <Button
                  className="cursor-pointer"
                  type={'primary'}
                  onClick={() => {
                    saveBudgetComment();
                  }}
                >
                  Guardar
                </Button>
              </Flex>
            </Flex>
          </Modal>
        </ContainerCRM>
      </MainLayoutCRM>
    </>
  );
}
