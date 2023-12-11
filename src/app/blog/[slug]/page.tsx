'use client';

import '../styles/blog.css';

import { useEffect, useState } from 'react';
import { Professional } from '@interface/clinic';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Post } from 'types/blog';

import BlogAppointment from '../components/BlogAppointment';
import BlogAuthor from '../components/BlogAuthor';
import BlogBreadcrumb from '../components/BlogBreadcrumb';
import BlogCategories from '../components/BlogCategories';
import BlogRelatedPosts from '../components/BlogRelatedPosts';
import BlogShareBar from '../components/BlogShareBar';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { clinics, blogPosts } = useGlobalPersistedStore(state => state);

  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  const route = usePathname();

  useEffect(() => {
    const professionalsWithCity = clinics.flatMap(clinic =>
      clinic.professionals.filter(professional => {
        if (professional.professionalType === 1) {
          return {
            ...professional,
            city: clinic.city,
          };
        }
      })
    );

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  const post: Post | undefined = blogPosts?.filter(
    post => post.slug === params.slug
  )[0];

  if (!post) {
    return <></>;
  }

  console.log(post.html);

  const test = `<div class="blog-intro">
  <p>Existen diferentes factores que influyen en la aparición de la papada y conocerlos te ayudará a encontrar el mejor método para eliminar tu papada sin cirugía
  </p>

  <p>
    Si alguna vez has pensado qué hacer para quitar tu papada, no te preocupes, es más normal de lo que crees. Según la Sociedad Española de Medicina Estética (SEME), desde el 2010, se han duplicado los tratamientos dedicados al cuello, el escote y a la papada. Esto está directamente relacionado al aumento del uso de móviles y tablets en el día a día que provocan vivir continuamente con la cabeza mirando hacia abajo, síndrome que se denomina popularmente “tech neck”. Además, en los últimos años, se ha intensificado la conciencia de la propia imagen debido a los “selfies” o a las videollamadas. Sin embargo, ¿sabrías decir qué es papada y qué no? A continuación, te explicamos todo sobre esta parte del cuerpo tan polémica y todos los métodos para eliminarla sin pasar por el quirófano. 
  </p>
</div>

<h3 class="title">
  Qué es la papada

</h3>

<p>La papada consiste en un exceso de tejido adiposo, conocido coloquialmente como grasa corporal, en la zona superior del cuello, justo debajo de la mandíbula. El volumen de esta acumulación de grasa provoca una arruga, más o menos evidente, y genera que el ángulo cervicofacial no esté definido. En general, la papada comienza a aparecer a partir de los 30 años, sin embargo, es importante diferenciar cada tipo de papada y su causa específica para encontrar el tratamiento personalizado más eficaz. 
</p>

<h3 class="title">
  Tipos de papada
</h3>
<p>A menudo, se utiliza el término papada de manera incorrecta para referirse al efecto óptico de un cuello con volumen debajo del mentón o doble mentón. Teniendo en cuenta esto, podemos diferenciar cuatro tipos de papada diferentes:
</p>
<ul class="number-list">
  <li>
    <span>1</span>
    <p>La primera responde estrictamente a la definición de papada y se trata de una acumulación de tejido adiposo en esta zona, es decir, grasa.
      </p>
  </li>
  <li>
    <span>2</span>
    <p>La segunda consiste en un exceso de piel debido a la pérdida de elasticidad de los tejidos cutáneos de debajo de la barbilla.
    </p>
  </li>
  <li>
    <span>3</span>
    <p>La tercera se produce por una pérdida de fuerza en el músculo de la barbilla, por lo que se descuelga.</p>
  </li>
  <li>
    <span>4</span>
    <p>Por último, la cuarta se refiere a los casos en los que el hueso mandibular es más corto en comparación con la musculatura que sobresale dando aspecto de papada. 
    </p>
  </li>
</ul>

<h3 class="title">Qué tipo de papada tengo
</h3>

<p>Cada tipo de papada responde a un método diferente para reducirla o eliminarla. Por eso, en Holaglow damos tanta importancia a una cita médica de asesoramiento previa para personalizar nuestros tratamientos de medicina estética. Aun así, existen algunos consejos para comenzar a intuir qué tipo de papada tienes. Por un lado, si puedes pellizcar de manera abundante tu papada lo más probable es que se trate de grasa. Por otro, si se desliza fácilmente al agarrar la zona de debajo de la mandíbula seguramente sea un exceso de piel. En cambio, si las bandas platismales se marcan de manera prominente con algunos movimientos, es posible que se deba a un problema muscular.
</p>

<h3 class="title">Por qué aparece la papada
</h3>

<p>Del mismo modo que existen diferentes tipos de papada, también es importante resaltar que hay muchos factores que pueden influir en su aparición, incluso algunos de ellos que no dependen de nuestra voluntad. Según las causas específicas de por qué aparece la papada en cada caso, se deberá emplear un tratamiento u otro para su eliminación. Así pues, las causas de la papada se pueden categorizar en cuatro grandes grupos: 
</p>

<ul class="number-list">
  <li>
    <span>1</span>
    <p>Factor genético: Cada persona es más propensa a acumular grasa extra en diferentes partes del cuerpo, ya sea alrededor de la cintura, en los muslos o en la papada, por ejemplo. Por tanto, existen algunas personas que tienen papada, sea cuál sea su peso, porque su cuerpo almacena genéticamente grasa adicional alrededor de la línea mandibular. Estas personas con predisposición genética tendrán pocas variaciones en su papada por mucho que bajen de peso. 
    </p>
  </li>
  <li>
    <span>2</span>
    <p>Factor conductual: Existen distintos hábitos de conducta que pueden acelerar la aparición de la papada. El más evidente es la mala alimentación y el exceso de grasas, sin embargo, no es el único. Hábitos como el tabaco y la exposición solar empeoran la calidad tisular, es decir, dañan los tejidos del organismo. Otros factores relacionados con nuestro estilo de vida que influyen en incrementar la papada son el alcohol e incluso el estrés.
    </p>
  </li>
  <li>
    <span>3</span>
    <p>Envejecimiento: Otra de las causas principales a las que se le suele achacar la aparición de la papada es el paso del tiempo. Sin embargo, en este caso, se trata de piel descendida en lugar de exceso de grasa. A medida que cumplimos años, el rostro pierde progresivamente su tonicidad y se genera la flacidez facial-cervical. Esto provoca que los tejidos se desplacen debido a la gravedad y se acumulen en la zona que coincide con la barbilla, generando este efecto de papada. 
    </p>
  </li>
  <li>
    <span>4</span>
    <p>Factor anatómico: Por último, también existen algunas causas anatómicas como un hueso mandibular pequeño. La consecuencia es que la estructura ósea no es suficientemente grande y no sujeta adecuadamente los tejidos cutáneos o musculares del rostro, por tanto, la delimitación entre la mandíbula y el cuello no queda definida generando esta apariencia de doble mentón o papada. 
    </p>
  </li>
</ul>

<h3 class="title">Cómo eliminar la papada sin cirugía
</h3>

<p>A veces parece que la única solución para eliminar la papada es pasar por el quirófano, aun así, antes de tomar esta decisión tan drástica, existen muchos métodos y tratamientos de medicina estética para la papada, así como para definir el cuello y la línea mandibular. Por eso, es fundamental contar con un diagnóstico médico previo y saber qué estructuras son las que se tienen que tratar. Una vez analizado el tipo de papada y la causa principal de su formación, se valorará qué opción es mejor para quitarla sin cirugía, desde tratamientos para potenciar la definición mandibular hasta el tratamiento más efectivo para eliminar la grasa submentoniana con Belkyra. Esta última opción es uno de los tratamientos no quirúrgicos más demandados que consiste en inyectar ácido desoxicólico en la zona de la papada para disolver la grasa y producir una retracción. Este inyectable ha adquirido protagonismo en los últimos años como la técnica no invasiva contra la papada por excelencia. Si te gustaría profundizar más sobre el tema, consulta el artículo en el que explicamos todo sobre cómo eliminar la papada sin cirugía con ácido desoxicólico. 
</p>

<h3 class="title">Tratamientos de medicina estética para la papada
</h3>

<table>
  <tr>
    <th>Causa</th>
    <th>Tipo de papada</th>
    <th>Tratamiento sin cirugía</th>
    <th>Tratamientos complementarios</th>
  </tr>
  <tr>
    <td>Genética o conductual</td>
    <td>Exceso de tejido adiposo</td>
    <td>Eliminación de papada con ácido desoxicólico</td>
    <td>Drenaje linfático Radiofrecuencia</td>
  </tr>
</table>

<table>
  <tr>
    <th>Causa</th>
    <th>Efecto optico de papada</th>
    <th>Tratamiendo sin cirugía</th>
  </tr>
  <tr>
    <td>Envejecimiento</td>
    <td>Pérdida de fuerza muscular o pérdida de elasticidad de la piel</td>
    <td>Hilos tensores en rostro o cuello</td>
  </tr>
  <tr>
    <td>Anatómica</td>
    <td>Ángulo mandibular corto</td>
    <td>Proyección de mandíbula con ácido hialurónico</td>
  </tr>
  <tr>
    <td></td>
    <td>Barbilla retraída</td>
    <td>Proyección de mentón con ácido hialurónico</td>
  </tr>
</table>`;

  return (
    <MainLayout>
      <div className="rounded-t-3xl shadow-centered-black-lg ">
        <Container className="mb-8 py-6 md:py-12">
          <BlogBreadcrumb title={post.title} />

          <Image
            src="/images/blog/post1.png"
            alt="placeholder"
            height={400}
            width={600}
            className="w-full rounded-3xl mb-8"
          />

          <Flex className="gap-20 items-start">
            <div>
              <BlogCategories className="mb-8" categories={post.categories} />

              <Text className="font-bold mb-4 text-2xl md:text-5xl">
                {post.title}
              </Text>
              <Text size="xs" className="mb-8">
                Por Dr. {post.author}.{' '}
                <span className="text-hg-black500">
                  {dayjs(post.creationDate).format('D MMMM, YYYY')}
                </span>
              </Text>

              <div
                className="blog-post"
                dangerouslySetInnerHTML={{ __html: test }}
              />
            </div>

            <div className="hidden md:block shrink-0 w-[360px]">
              <BlogShareBar
                className="my-12"
                url={`https://www.holaglow.com${route}`}
                title="titulo del post"
              />

              <BlogRelatedPosts
                className="pb-12"
                categories={post.categories}
                posts={blogPosts}
              />
            </div>
          </Flex>
        </Container>

        {professionals && (
          <BlogAuthor className="mb-12" professional={professionals[1]} />
        )}

        <Container className="border-t border-hg-black md:hidden">
          <BlogShareBar
            className="my-12"
            url={`https://www.holaglow.com${route}`}
            title="titulo del post"
          />

          <BlogRelatedPosts
            className="pb-12"
            categories={post.categories}
            posts={blogPosts}
          />
        </Container>

        <BlogAppointment />
      </div>
    </MainLayout>
  );
}
