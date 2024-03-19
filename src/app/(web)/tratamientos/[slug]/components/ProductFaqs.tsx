import { Product } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

import { FAQ, faqItems } from './faqs';

const SimpleAccordion = dynamic(
  () => import('designSystem/Accordion/SimpleAccordion'),
  { ssr: false }
);

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

      <div className="md:grid md:grid-cols-2 md:gap-6">
        {faqs.map((faq, index) => {
          return (
            <SimpleAccordion
              key={faq.title}
              className={`border-b border-hg-black md:mb-0 ${
                faqs.length === index + 1 ? '' : 'pb-6 mb-6'
              }`}
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
