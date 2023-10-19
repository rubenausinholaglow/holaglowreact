import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';

import { FAQ, faqItems } from './faqs';

export default function ProductFaqs({ product }: { product: Product }) {
  const getFaqsForAppliedProduct = (appliedProduct: string) => {
    if (faqItems[appliedProduct]) {
      return faqItems[appliedProduct];
    } else {
      return [];
    }
  };

  const faqs: FAQ[] = [];
  const getFaqsFromProduct = (product: Product) => {
    product.appliedProducts.forEach(x => {
      const faqsToAdd = getFaqsForAppliedProduct(x.titlte);
      faqsToAdd.forEach(y => {
        if (!faqs.find(y => x.titlte == y.description)) faqs.push(y);
      });
    });
  };
  getFaqsFromProduct(product);
  return (
    <Container className="py-12">
      <Title size="2xl" className="font-bold mb-8 md:mb-12">
        Consulta las preguntas{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>frecuentes</Underlined>
      </Title>

      <Flex layout="col-left" className="gap-6 md:flex-row md:gap-16">
        {faqs.map(x => {
          return (
            <>
              <Flex layout="col-left" className="w-full gap-6 md:w-1/2">
                <SimpleAccordion
                  className="border-b border-hg-black pb-4"
                  trigger={x.title}
                  triggerStyles="text-left items-start font-semibold"
                >
                  <Text size="sm" className="text-hg-black500 py-4">
                    {x.description}
                  </Text>
                </SimpleAccordion>
              </Flex>
            </>
          );
        })}
      </Flex>
    </Container>
  );
}
