import { Product } from 'app/(dashboard)/dashboard/interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Container } from 'designSystem/Layouts/Layouts';
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
      <Title isAnimated size="2xl" className="font-bold mb-8 md:mb-12">
        Consulta las preguntas{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>frecuentes</Underlined>
      </Title>

      <div className="md:grid md:grid-cols-2 md:gap-6">
        {faqs.map(faq => {
          return (
            <SimpleAccordion
              key={faq.title}
              className="border-b border-hg-black pb-6 mb-6 md:mb-0"
              trigger={faq.title}
              triggerStyles="text-left items-start font-semibold"
            >
              <Text size="sm" className="text-hg-black500 py-4">
                {faq.description}
              </Text>
            </SimpleAccordion>
          );
        })}
      </div>
    </Container>
  );
}
