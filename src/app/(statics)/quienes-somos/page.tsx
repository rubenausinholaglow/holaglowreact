import MainLayout from 'app/components/layout/MainLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export const metadata = {
  title: 'El equipo detrás de Holaglow',
  description:
    'Queremos cambiar el significado de la medicina estética como una opción más de autocuidado y de la expresión personal.',
};
export default function AboutUs() {
  return <MainLayout>sobre nosotros!</MainLayout>;
}
