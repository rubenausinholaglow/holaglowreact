'use client';
import React, { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import TextArea from '@dashboardComponents/ui/TextArea';
import { Budget } from '@interface/budget';
import { Accordion } from '@radix-ui/react-accordion';
import { budgetService } from '@services/BudgetService';
import ContainerCRM from 'app/crm/components/layout/ContainerCRM';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgUserOctagon } from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';

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
          <Flex className="w-full gap-2 justify-end p-4">
            <Text className="text-sm text-hg-black500 mr-auto">
              {dayjs(budgetDetail?.creationDate).format('YYYY-MM-DD')}
            </Text>
            <Button
              type="primary"
              className={budgetDetail.statusBudget !== 1 ? 'opacity-30' : ''}
              onClick={() => {
                setBudgetStatus('1');
              }}
            >
              Pendiente
            </Button>
            <Button
              type="primary"
              className={budgetDetail.statusBudget !== 3 ? 'opacity-30' : ''}
              onClick={() => {
                setBudgetStatus('3');
              }}
            >
              Rechazado
            </Button>
            <Button
              type="primary"
              className={budgetDetail.statusBudget !== 4 ? 'opacity-30' : ''}
              onClick={() => {
                setBudgetStatus('4');
              }}
            >
              Pagado
            </Button>
          </Flex>
          <Flex className="w-full gap-4 p-4 items-start">
            <SvgUserOctagon className="h-8 w-8 shrink-0" />
            <Flex layout="col-left" className="w-full">
              <Text className="font-semibold">
                {budgetDetail?.user!.firstName +
                  ' ' +
                  budgetDetail?.user!.lastName +
                  ' ' +
                  budgetDetail?.user!.secondLastName}
              </Text>
              <Text className="text-sm mb-4">{budgetDetail?.user!.phone}</Text>
            </Flex>
          </Flex>

          <Flex className="w-full gap-4 p-4 items-start">
            <SvgHolaglowHand className="h-8 w-8 shrink-0 text-hg-secondary" />
            <Flex layout="col-left" className="w-full">
              <Text className="font-semibold">
                {budgetDetail?.professional!.name}
              </Text>
              <Text className="text-sm">
                {budgetDetail?.products.map(x => <>{x.product?.title}</>)}
              </Text>
              <Text className="text-sm">
                Importe: {budgetDetail?.totalPrice}€
              </Text>

              <div className=" w-full mt-8">
                {budgetDetail?.budgetComments!.map(x => (
                  <div key={x.id}>
                    <div className="bg-hg-black100 p-4 rounded-2xl w-full mb-2 text-sm">
                      {x.comment}
                    </div>

                    <Button
                      wrapperClassName="ml-auto"
                      className="cursor-pointer"
                      type="white"
                      onClick={() => {
                        setCommentId(x.id);
                        setComment(x.comment);
                      }}
                    >
                      Editar comentario
                    </Button>
                  </div>
                ))}

                <Accordion
                  collapsible
                  type="single"
                  className="border-t border-hg-black300 mt-8 pt-8"
                >
                  <AccordionItem>
                    <AccordionTrigger>
                      <Flex className="items-start">Añadir comentario</Flex>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4">
                        <TextArea
                          onChange={event => setComment(event.target.value)}
                          value={comment}
                          placeholder="Nuevo comentario"
                        />
                        <Button
                          className="cursor-pointer"
                          type={'primary'}
                          onClick={() => {
                            saveBudgetComment();
                          }}
                        >
                          Guardar
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Flex>
          </Flex>

          {/* <Modal
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
          </Modal> */}
        </ContainerCRM>
      </MainLayoutCRM>
    </>
  );
}
