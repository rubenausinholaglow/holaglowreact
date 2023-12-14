import MainLayout from 'app/(web)/components/layout/MainLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <meta name="robots" content="noindex,follow" />
      <Container className="py-8 md:py-12">
        <Title className="mb-8">Política de privacidad</Title>
        <Flex layout="col-left" className="gap-4">
          <p className="font-semibold">Responsable del tratamiento</p>
          <p>Identidad: GLOW LAB, S.L.</p>
          <p>NIF: B44718971</p>
          <p>Dirección postal: C/ PAU CLARIS 190, 08037, BARCELONA</p>
          <p>Correo electrónico: legal@holaglow.com</p>
          <p>
            GLOW LAB, S.L, como responsable del Sitio Web, de conformidad con lo
            que dispone el Reglamento (UE) 2016/679 de 27 de abril de 2016
            (RGPD) relativo a la protección de las personas físicas en cuanto al
            tratamiento de datos personales y a la libre circulación de estos
            datos y demás normativa vigente en materia de protección de datos
            personales, Europea o Nacional, le informa de que tiene
            implementadas las medidas de seguridad necesarias, de índole técnica
            y organizativas, para garantizar y proteger la confidencialidad,
            integridad y disponibilidad de los datos introducidos.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Finalidad del tratamiento
          </p>
          <p>
            Sus datos personales se utilizarán para las siguientes finalidades:
          </p>
          <ul className="pl-8 flex flex-col gap-4 list-disc">
            <li>
              <p>
                Realizar las gestiones comerciales y administrativas necesarias
                con los usuarios de la web;
              </p>
            </li>
            <li>
              <p>
                Remitir las comunicaciones comerciales publicitarias por email,
                fax, SMS, MMS, comunidades sociales o cualesquiera otro medio
                electrónico o físico, en caso de que el Usuario haya consentido
                expresamente al envío de comunicaciones comerciales por vía
                electrónica;
              </p>
            </li>
            <li>
              <p>
                Responder a las consultas y/o proporcionar informaciones
                requeridas por el Usuario;
              </p>
            </li>
            <li>
              <p>
                Gestionar las interacciones de los usuarios por las redes
                sociales.
              </p>
            </li>
            <li>
              <p>
                Realizar las prestaciones de servicios y/o productos contratados
                o suscritos por el Cliente.
              </p>
            </li>
            <li>
              <p>
                Gestionar los datos identificativos de los usuarios que utilizan
                nuestra herramienta por contratación del cliente. Utilizar sus
                datos para contactarle, tanto por vía electrónica como no
                electrónica, para obtener su opinión sobre el servicio prestado
                y,
              </p>
            </li>
            <li>
              <p>
                Notificarle cambios, desarrollos importantes de la política de
                privacidad, aviso legal o política de cookies.
              </p>
            </li>
            <li>
              <p>
                Se realizarán análisis de perfiles y de usabilidad, tanto del
                uso de la herramienta como de la página Web, mediante la
                implantación de cookies.
              </p>
            </li>
            <li>
              <p>
                Los datos de clientes y/o de proveedores serán tratados, dentro
                de la relación contractual que les vincula con el responsable,
                en cumplimiento de las obligaciones administrativas, fiscales,
                contables y laborales que sean necesarias en virtud de la
                legislación vigente.
              </p>
            </li>
            <li>
              <p>
                En caso de espacios videovigilados, la finalidad del tratamiento
                es la de proporcionar seguridad en el entorno de la empresa
                tanto a trabajadores como a visitantes.
              </p>
            </li>
          </ul>
          <p>
            Puede revocar en cualquier momento su consentimiento remitiendo un
            escrito con el asunto “Baja” a legal@holaglow.com.
          </p>
          <p>
            GLOW LAB, S.L, no realiza prácticas de SPAM, por lo tanto, no envía
            correos comerciales por e-mail que no hayan sido previamente
            solicitados o autorizados por el Usuario. En consecuencia, en todas
            las comunicaciones que recibirá de GLOW LAB, S.L., el usuario tiene
            la posibilidad de cancelar su consentimiento expreso para recibir
            nuestras comunicaciones.
          </p>
          <p>
            No trataremos sus datos personales para ninguna otra finalidad de
            las descritas salvo por obligación legal o requerimiento judicial.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Plazos de conservación
          </p>
          <p>
            Sus datos se conservarán mientras dure la relación comercial con
            nosotros o ejercite su derecho de cancelación u oposición, o
            limitación al tratamiento. Sin embargo, conservaremos determinados
            datos personales identificativos y del tráfico durante el plazo
            máximo de 2 años para el caso de que fuera requerido por los Jueces
            y Tribunales o para incoar acciones internas derivadas del uso
            indebido de la página web.
          </p>
          <p>
            Asimismo, le informamos que nuestras políticas de conservación de la
            información se ajustan a los plazos que marcan las distintas
            responsabilidades legales a efectos de prescripción.
          </p>
          <p>
            No será objeto de decisiones basadas en tratamientos automatizados
            que produzcan efectos sobre sus datos.
          </p>
          <p>Legitimación del tratamiento</p>
          <p>
            a) Ejecución del contrato. b) Consentimiento del interesado. c)
            Cumplimiento de obligaciones legales. d) Interés legítimo: envío de
            publicidad propia.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Comunicaciones
          </p>
          <p>
            Cualquier comunicación remitida quedará incorporada a los sistemas
            de información de GLOW LAB, S.L., Al aceptar las presentes
            condiciones, términos y políticas, el Usuario consiente expresamente
            a que realice las siguientes actividades y/o acciones, salvo que el
            Usuario indique lo contrario:
          </p>
          <ul className="pl-8 flex flex-col gap-4 list-disc">
            <li>
              <p>
                El envío de comunicaciones comerciales y/o promocionales por
                cualquier medio habilitado informando a los Usuarios de las
                actividades, servicios, promociones, publicidad, noticias,
                ofertas y demás información sobre los servicios y productos
                relacionados con la actividad.
              </p>
            </li>
            <li>
              <p>
                En caso de que el Usuario haya consentido expresamente al envío
                de comunicaciones comerciales por vía electrónica, el envío de
                dichas comunicaciones por medios electrónicos informando a los
                Usuarios de las actividades, servicios, promociones, publicidad,
                noticias, ofertas y demás información sobre los servicios y
                productos de iguales o similares a los que fueron inicialmente
                objeto de contratación o de interés por el Usuario.
              </p>
            </li>
            <li>
              <p>
                La conservación de los datos durante los plazos previstos en las
                disposiciones aplicables.
              </p>
            </li>
          </ul>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Medios oficiales de comunicación
          </p>
          <p>
            Se informa al usuario que los medios habilitados por la empresa para
            comunicarse con clientes y otros afectados es el teléfono
            corporativo, los teléfonos móviles de empresa y el correo
            electrónico corporativo.
          </p>
          <p>
            Si Vd. remite información personal a través un medio de comunicación
            distinto a los indicados en este apartado, quedará exenta de
            responsabilidad en relación con las medidas de seguridad que
            disponga el medio en cuestión.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Destinatarios de cesiones o transferencias
          </p>
          <p>
            Los destinatarios de la información pueden ser proveedores de los
            servicios contratados, aquellos proveedores externos con los que se
            celebra el correspondiente contrato de Encargado de Tratamiento.
          </p>
          <p>
            Así mismo, el prestador facilitará información a las fuerzas y
            cuerpos de seguridad bajo orden judicial o por obligación de una
            norma legal, sin perjuicio de poder bloquear o cancelar su cuenta si
            puede haber indicios de la comisión de algún delito por parte del
            usuario.
          </p>
          <p>
            La información facilitada será solamente la que disponga en este
            momento el prestador. La información que usted nos proporcione tanto
            a través de este sitio web como a través de la aplicación será
            alojada en los servidores de GLOW LAB, S.L.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Derechos de las personas interesadas
          </p>
          <p>
            Como usuario-interesado, puede solicitar el ejercicio de los
            siguientes derechos ante presentando un escrito a la dirección
            postal del encabezamiento o enviando un correo electrónico a
            legal@holaglow.com, indicando como Asunto: “RGPD, Derechos
            afectado”, y adjuntando fotocopia de su DNI o cualquier medio
            análogo en derecho, tal y como indica la ley.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Derechos:
          </p>
          <ul className="pl-8 flex flex-col gap-4 list-disc">
            <li>
              <p>
                Derecho de acceso: permite al interesado conocer y obtener
                información sobre sus datos de carácter personal sometidos a
                tratamiento.
              </p>
            </li>
            <li>
              <p>
                Derecho de rectificación o supresión: permite corregir errores y
                modificar los datos que resulten ser inexactos o incompletos.
              </p>
            </li>
            <li>
              <p>
                Derecho de cancelación: permite que se supriman los datos que
                resulten ser inadecuados o excesivos.
              </p>
            </li>
            <li>
              <p>
                Derecho de oposición: derecho del interesado a que no se lleve a
                cabo el tratamiento de sus datos de carácter personal o se cese
                en el mismo.
              </p>
            </li>
            <li>
              <p>
                Limitación del tratamiento: conlleva el marcado de los datos
                personales conservados, con la finalidad de limitar su futuro
                tratamiento.
              </p>
            </li>
            <li>
              <p>
                Portabilidad de los datos: facilitación de los datos objeto de
                tratamiento al interesado, a fin de que éste pueda transmitirlos
                a otro responsable, sin impedimentos.
              </p>
            </li>
            <li>
              <p>
                Derecho a no ser objeto de decisiones individuales automatizadas
                (incluida la elaboración de perfiles): derecho a no ser objeto
                de una decisión basada en el tratamiento auto- 03 matizado que
                produzca efectos o afecte significativamente.
              </p>
            </li>
          </ul>
          <p>
            Como usuario, tiene derecho a retirar el consentimiento prestado en
            cualquier momento. La retirada del consentimiento no afectará a la
            licitud del tratamiento efectuado antes de la retirada del
            consentimiento. También tiene derecho a presentar una reclamación
            ante la autoridad de control si considera que pueden haberse visto
            vulnerados sus derechos con relación a la protección de sus datos.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Información adicional
          </p>
          <p>
            Los datos recogidos por parte del responsable son los siguientes:
          </p>
          <ul className="pl-8 flex flex-col gap-4 list-disc">
            <li>
              <p>
                Aquellos que los usuarios suministren a través de los diferentes
                servicios ofrecidos en la página web
              </p>
            </li>
            <li>
              <p>
                Aquellos incluidos en los diferentes formularios previstos en la
                página web
              </p>
            </li>
            <li>
              <p>
                Datos recogidos a través de las “cookies” para la mejora de la
                experiencia de la navegación según se informa en la política de
                cookies.
              </p>
            </li>
            <li>
              <p>
                Datos facilitados por los clientes destinatarios de los
                servicios, por cualquier medio.
              </p>
            </li>
          </ul>
          <p>
            A través de esta Política de Privacidad le informamos que las
            fotografías que estén colgadas en la web son propiedad de incluyendo
            las de los menores, en las que, para la obtención de estas, se ha
            obtenido el consentimiento previo de los padres, tutores o
            representantes legales mediante la firma de los formularios
            realizados al efecto por los centros en los cuales los menores
            forman parte.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Videovigilancia
          </p>
          <p>
            En algunos establecimientos pueden captarse imágenes con los únicos
            fines indicados en el apartado de finalidades de la presente
            política de privacidad y/o a petición de autoridades.
          </p>
          <p>
            Disponemos de circular informativa a petición de los interesados que
            la soliciten y de un logo de zona videovigilada ubicado en lugar
            previo a la cámara y suficientemente visible que informa que el
            lugar es un establecimiento videovigilado.
          </p>
          <p>
            Las imágenes captadas por las cámaras se limitarán al
            establecimiento público de que se trate. No se captarán imágenes de
            la vía pública a excepción de una franja mínima de los accesos al
            establecimiento.
          </p>
          <p>
            El sistema de grabación se ubicará en un lugar vigilado o de acceso
            restringido. A las imágenes obtenidas accede sólo la persona
            autorizada y serán conservadas durante un plazo máximo de un mes
            desde su captación.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Redes sociales
          </p>
          <p>
            Le informamos que GLOW LAB, S.L. puede tener presencia en redes
            sociales. El tratamiento de los datos que se lleve a cabo de las
            personas que se hagan seguidoras en las redes sociales (y/o realicen
            cualquier vínculo o acción de conexión a través de las redes
            sociales) de las páginas oficiales de GLOW LAB, S.L. se regirá por
            este apartado, así como por aquellas condiciones de uso, políticas
            de privacidad y normativas de acceso que pertenezcan a la red social
            que proceda en cada caso y aceptadas previamente por el usuario.
          </p>
          <p>
            GLOW LAB, S.L. tratará sus datos con las finalidades de administrar
            correctamente su presencia en la red social, informándole de
            actividades, productos o servicios del prestador, así como para
            cualquier otra finalidad que las normativas de las Redes Sociales
            permitan.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Queda prohibida la publicación de contenidos:
          </p>
          <p>
            Que sean presuntamente ilícitos por la normativa nacional,
            comunitaria o internacional o que realicen actividades presuntamente
            ilícitas o contravengan los principios de la buena fe.
          </p>
          <p>
            Que atenten contra los derechos fundamentales de las personas,
            falten a la cortesía en la red, molesten o puedan generar opiniones
            negativas en nuestros usuarios o terceros y en general cualesquiera
            sean los contenidos que considere inapropiados.
          </p>
          <p>
            Y en general que contravengan los principios de legalidad, honradez,
            responsabilidad, protección de la dignidad humana, protección de
            menores, protección del orden público, la protección de la vida
            privada, la protección del consumidor y los derechos de propiedad
            intelectual e industrial.
          </p>
          <p>
            Asimismo, se reserva la potestad de retirar, sin previo aviso del
            sitio web o de la red social corporativa aquellos contenidos que se
            consideren inapropiados.
          </p>
          <p>
            Las comunicaciones remitidas a través de las redes sociales serán
            incorporadas a un archivo propiedad de GLOW LAB, S.L, pudiéndole
            enviar información de su interés.
          </p>
          <p>
            En todo caso, si Vd. remite información personal a través de la red
            social, la empresa quedará exenta de responsabilidad en relación con
            las medidas de seguridad aplicables a la presente plataforma,
            debiendo el usuario en caso de querer conocerlas, consultar las
            correspondientes condiciones particulares de la red en cuestión.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Medidas de seguridad
          </p>
          <p>
            Los datos que nos facilite se tratarán de forma confidencial. El
            Prestador ha adoptado todas las medidas técnicas y organizativas y
            todos los niveles de protección necesarios 04 para garantizar la
            seguridad en el tratamiento de los datos y evitar su alteración,
            pérdida, robo, tratamiento o acceso no autorizado, de acuerdo el
            estado de la tecnología y naturaleza de los datos almacenados. Así
            mismo, se garantiza también que el tratamiento y registro en
            ficheros, programas, sistemas o equipos, locales y centros cumplen
            con los requisitos y condiciones de integridad y seguridad
            establecidas en la normativa vigente.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Legislación
          </p>
          <p>
            A todos los efectos, las relaciones entre GLOW LAB, S.L. con los
            Usuarios de sus servicios telemáticos presentes en esta Web, están
            sometidos a la legislación y jurisdicción española a la que se
            someten expresamente las partes.
          </p>
          <p className="font-semibold pt-6 mt-6 border-t border-hg-black300 w-full">
            Cambios en la presente política de privacidad
          </p>
          <p>
            GLOW LAB, S.L. se reserva el derecho a modificar la presente
            política para adaptarla a novedades legislativas o
            jurisprudenciales.
          </p>
        </Flex>
      </Container>
    </MainLayout>
  );
}
