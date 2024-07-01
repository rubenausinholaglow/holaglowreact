'use client';
import React, { useEffect, useState } from 'react';
import TextArea from '@dashboardComponents/ui/TextArea';
import { Budget, BudgetProduct } from '@interface/budget';
import { Accordion } from '@radix-ui/react-accordion';
import { budgetService } from '@services/BudgetService';
import {
  budgetTotalPriceWithDiscount,
  getProductPrice,
} from '@utils/budgetUtils';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
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
import { Text } from 'designSystem/Texts/Texts';

interface BudgetDetailsProps {
  params: { id: string };
}

export default function BudgetDetailPage({ params }: BudgetDetailsProps) {
  const [budgetDetail, setBudgetDetail] = useState<Budget | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [comment, setComment] = useState('');

  async function getBudget() {
    setBudgetDetail(undefined);
    budgetService.getBudget(params.id).then(x => {
      if (x) {
        let total = 0;
        x.products.forEach(x => {
          total += getProductPrice(x);
        });
        x.totalPriceWithIVA = budgetTotalPriceWithDiscount(x, total);
        setBudgetDetail(x);
        let statusText = 'Pendiente';
        if (x?.statusBudget == 3) {
          statusText = 'Rechazado';
        }
        if (x?.statusBudget == 4) {
          statusText = 'Pagado';
        }

        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    getBudget();
  }, []);

  if (!budgetDetail) {
    return (
      <>
        <MainLayoutCRM>
          <ContainerCRM>
            <FullScreenLoading />
          </ContainerCRM>
        </MainLayoutCRM>
      </>
    );
  }

  async function setBudgetStatus(status: string) {
    setIsLoading(true);
    await budgetService.updateStatus(budgetDetail!.id!, status);
    getBudget();
  }

  async function saveBudgetComment() {
    if (commentId) {
      await budgetService.updateComment(commentId, comment);
    } else {
      await budgetService.addComment(budgetDetail!.id!, comment);
    }
    if (budgetDetail?.statusBudget == 1) {
      await setBudgetStatus('4');
    }
    getBudget();
    setComment('');
    setCommentId('');
  }

  return (
    <>
      <MainLayoutCRM>
        <ContainerCRM>
          {isLoading ? (
            <FullScreenLoading />
          ) : (
            <>
              <Flex className="w-full gap-2 p-4">
                <Button type="primary" customStyles="bg-hg-black mr-auto">
                  <a
                    target="_blank"
                    href={
                      'https://budgetimages.blob.core.windows.net/images/budgets/' +
                      budgetDetail.id +
                      '/Presupuesto.pdf'
                    }
                  >
                    PDF
                  </a>
                </Button>
                <Button type="primary" customStyles="bg-hg-black mr-auto">
                  <a
                    target="_blank"
                    href={
                      'https://www.holaglow.com/dashboard?isCallCenter=true&ignoreMessages=true&phoneNumber=+34' +
                      budgetDetail.user?.phone
                    }
                  >
                    Crear Presupuesto
                  </a>
                </Button>
                <Flex className="w-full justify-end">
                  <Button
                    type="primary"
                    customStyles="bg-hg-black500 mr-2"
                    className={
                      budgetDetail.statusBudget !== 1 ? 'opacity-30' : ''
                    }
                    onClick={() => {
                      setBudgetStatus('1');
                    }}
                  >
                    Pendiente
                  </Button>
                  <Button
                    type="primary"
                    customStyles="bg-hg-tertiary mr-2"
                    className={
                      budgetDetail.statusBudget !== 6 ? 'opacity-30' : ''
                    }
                    onClick={() => {
                      setBudgetStatus('6');
                    }}
                  >
                    En seguimiento
                  </Button>
                  <Button
                    type="primary"
                    customStyles="bg-hg-error mr-2"
                    className={
                      budgetDetail.statusBudget !== 3 ? 'opacity-30' : ''
                    }
                    onClick={() => {
                      setBudgetStatus('3');
                    }}
                  >
                    Rechazado
                  </Button>
                  <Button
                    type="primary"
                    customStyles="bg-hg-green mr-2"
                    className={
                      budgetDetail.statusBudget !== 4 ? 'opacity-30' : ''
                    }
                    onClick={() => {
                      setBudgetStatus('4');
                    }}
                  >
                    Pagado
                  </Button>
                </Flex>
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
                  <Text className="text-sm mb-4">
                    {budgetDetail?.user!.phone}
                  </Text>
                </Flex>
              </Flex>

              <Flex className="w-full gap-4 p-4 items-start">
                <SvgHolaglowHand className="h-8 w-8 shrink-0 text-hg-secondary" />
                <Flex layout="col-left" className="w-full">
                  <Text className="font-semibold">
                    {budgetDetail?.products.map(x => (
                      <Text key={x.id} className="font-semibold">
                        {x.product?.title} - {getProductPrice(x)}€
                        {getProductPrice(x) != x.price &&
                          ' (Original: ' + x.price + '€)'}
                      </Text>
                    ))}
                  </Text>
                  <Text className="text-sm">
                    Importe: {budgetDetail?.totalPriceWithIVA}€
                  </Text>
                  <Text className="text-sm text-hg-black500budget">
                    {budgetDetail?.professional!.name}
                  </Text>

                  <div className="w-full mt-8">
                    {budgetDetail
                      ?.budgetComments!.sort((a, b) =>
                        a.creationDate! < b.creationDate ? 1 : -1
                      )
                      .map(x => (
                        <div key={x.id} className="mb-2 relative">
                          <Text className="text-sm text-hg-black500budget">
                            {dayjs(x?.creationDate).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )}
                          </Text>
                          <TextArea
                            placeholder="Nuevo comentario"
                            className={`bg-hg-black100 p-4 rounded-2xl w-full mb-2 text-sm border-none ${
                              commentId === x.id
                                ? ''
                                : 'opacity-50 pointer-events-none'
                            }`}
                            onChange={event => setComment(event.target.value)}
                            value={commentId === x.id ? comment : x.comment}
                          />
                          {commentId === x.id ? (
                            <Text
                              className="cursor-pointer text-hg-secondary text-xs absolute bottom-6 right-4"
                              onClick={() => {
                                saveBudgetComment();
                              }}
                            >
                              Guardar
                            </Text>
                          ) : (
                            <Text
                              className="cursor-pointer text-hg-secondary text-xs absolute bottom-6 right-4"
                              onClick={() => {
                                setCommentId(x.id);
                                setComment(x.comment);
                              }}
                            >
                              Editar
                            </Text>
                          )}
                        </div>
                      ))}

                    <Accordion collapsible type="single" className="">
                      <AccordionItem>
                        <AccordionTrigger>
                          <Flex className="items-end">
                            <Button type="white">Añadir comentario</Button>
                          </Flex>
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
            </>
          )}
        </ContainerCRM>
      </MainLayoutCRM>
    </>
  );
}
