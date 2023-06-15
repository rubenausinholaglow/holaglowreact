import { Title, Text } from 'components/Texts';
import { Button } from 'components/Buttons';
import { TREATMENTS } from './mockedData';
import { Flex } from 'components/Layouts';

export default function Form() {
  return (
    <main className='flex flex-col border border-dashed border-slate-300 h-[800px] w-[420px] my-16 mx-auto py-6 px-4'>
      <section className='mb-6'>
        <Title size='2xl' className='mb-2'>
          Selecciona uno o varios tratamientos
        </Title>
        <Text>
          Puedes reservar cita para varios tratamientos a la misma vez aunque sea en días o clínicas distintas
        </Text>
      </section>

      <section>
        <ul>
          {TREATMENTS.map(treatment => (
            <li>
              <Button className='w-full mb-4'>
                <Flex layout='left-col'>
                  <Text size='xl' className='mb-2'>
                    {treatment.category}
                  </Text>
                  <Text size='sm' className='text-slate-500'>
                    Desde {treatment.price}€
                  </Text>
                </Flex>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
