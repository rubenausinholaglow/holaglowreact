import { isMobileSSR } from '@utils/isMobileSSR';
import { Product } from 'app/types/product';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

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
    product.appliedProducts?.forEach(x => {
      const faqsToAdd = getFaqsForAppliedProduct(x.titlte);
      faqsToAdd.forEach(y => {
        if (!faqs.find(z => z.title == y.title)) faqs.push(y);
      });
    });
  };
  getFaqsFromProduct(product);

  return (
    <Container className="py-12">
      <Title isAnimated size="2xl" className="font-bold mb-8 md:mb-12">
        Consulta las preguntas frecuentes
      </Title>

      <Flex
        layout="col-left"
        className="w-full gap-8 md:grid md:grid-cols-2 md:gap-16"
      >
        {isMobileSSR() &&
          faqs.map((faq, index) => {
            return (
              <SimpleAccordion
                key={faq.title}
                className="pb-4 md:mb-0 border-b border-hg-black"
                trigger={faq.title}
                triggerStyles="text-left items-start font-semibold"
              >
                <Text size="sm" className="text-hg-black500 pt-4">
                  {faq.description}
                </Text>
              </SimpleAccordion>
            );
          })}

        {!isMobileSSR() && (
          <Flex layout="col-left" className="w-full gap-6">
            {faqs.map((faq, index) => {
              if (index % 2 === 0) {
                return (
                  <SimpleAccordion
                    key={faq.title}
                    className="pb-4 md:mb-0 border-b border-hg-black"
                    trigger={faq.title}
                    triggerStyles="text-left items-start font-semibold pb-2"
                  >
                    <Text size="sm" className="text-hg-black500 pt-4">
                      {faq.description}
                    </Text>
                  </SimpleAccordion>
                );
              }
              return null;
            })}
          </Flex>
        )}

        {!isMobileSSR() && (
          <Flex layout="col-left" className="w-full gap-6">
            {faqs.map((faq, index) => {
              if (index % 2 !== 0) {
                return (
                  <SimpleAccordion
                    key={faq.title}
                    className="pb-4 md:mb-0 border-b border-hg-black"
                    trigger={faq.title}
                    triggerStyles="text-left items-start font-semibold pb-2"
                  >
                    <Text size="sm" className="text-hg-black500 pt-4">
                      {faq.description}
                    </Text>
                  </SimpleAccordion>
                );
              }
              return null;
            })}
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
